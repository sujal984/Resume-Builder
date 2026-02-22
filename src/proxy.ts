import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    console.log("Route accessed:", req.nextUrl.pathname, "LoggedIn:", isLoggedIn)
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
