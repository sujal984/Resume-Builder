"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
        return { error: "All fields are required." };
    }

    if (password.length < 6) {
        return { error: "Password must be at least 6 characters." };
    }

    try {
        // Check if user already exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        });
    } catch (error: unknown) {
        // Handle Postgres unique constraint violation (race condition safety)
        if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            (error as { code: string }).code === "23505"
        ) {
            return { error: "An account with this email already exists." };
        }

        console.error("Register DB error:", error);

        // Check for connection errors
        if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            ((error as { code: string }).code === "ECONNREFUSED" ||
                (error as { code: string }).code === "ENOTFOUND")
        ) {
            return { error: "Could not connect to the database. Please ensure PostgreSQL is running." };
        }

        return { error: "Registration failed. Please try again later." };
    }

    // Auto-login after registration (outside try-catch so NEXT_REDIRECT propagates)
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/editor/new",
        });
    } catch (error) {
        // NEXT_REDIRECT errors should be re-thrown (signIn redirects on success)
        if ((error as any)?.digest?.includes("NEXT_REDIRECT")) {
            throw error;
        }
        if (error instanceof AuthError) {
            return { error: "Registration succeeded but auto-login failed. Please sign in." };
        }
        console.error("Auto-login error:", error);
        return { error: "Registration succeeded but auto-login failed. Please sign in." };
    }
}

export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/editor/new",
        });
    } catch (error) {
        // NEXT_REDIRECT errors should be re-thrown (signIn redirects on success)
        if ((error as any)?.digest?.includes("NEXT_REDIRECT")) {
            throw error;
        }
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                case "CallbackRouteError":
                    return { error: "Could not verify credentials. Please check if PostgreSQL is running." };
                default:
                    return { error: "Something went wrong. Please try again." };
            }
        }

        // Check for connection errors
        if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            ((error as { code: string }).code === "ECONNREFUSED" ||
                (error as { code: string }).code === "ENOTFOUND")
        ) {
            return { error: "Could not connect to the database. Please ensure PostgreSQL is running." };
        }

        console.error("Login error:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function loginWithGoogle() {
    await signIn("google", { redirectTo: "/editor/new" });
}

export async function loginWithGitHub() {
    await signIn("github", { redirectTo: "/editor/new" });
}
