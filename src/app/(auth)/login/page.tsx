import EnhancedLoginForm from "@/components/auth/EnhancedLoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
            <EnhancedLoginForm />
        </div>
    );
}
