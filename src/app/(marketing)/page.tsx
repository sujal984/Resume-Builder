import Hero from "@/components/marketing/Hero";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Sparkles,
    Download,
    Layout,
    Palette,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: Layout,
        title: "Drag & Drop Editor",
        description:
            "Intuitive block-based editor. Rearrange sections with drag-and-drop.",
        color: "bg-violet-100 text-violet-600",
    },
    {
        icon: FileText,
        title: "Professional Templates",
        description:
            "Choose from multiple ATS-friendly templates designed by HR experts.",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Sparkles,
        title: "AI Writing Assistant",
        description:
            "Let AI help you write compelling bullet points and summaries.",
        color: "bg-amber-100 text-amber-600",
    },
    {
        icon: Palette,
        title: "Theme Customization",
        description:
            "Customize colors, fonts, and layouts to match your personal brand.",
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        icon: Download,
        title: "PDF Export",
        description:
            "Download your resume as a pixel-perfect PDF, ready to send.",
        color: "bg-rose-100 text-rose-600",
    },
    {
        icon: Zap,
        title: "Real-Time Preview",
        description:
            "See changes instantly as you edit. What you see is what you get.",
        color: "bg-sky-100 text-sky-600",
    },
];

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
                <div className="container flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-sm">
                            R
                        </div>
                        <span className="font-bold text-xl">ResumeForge</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <Link
                            href="/templates"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Templates
                        </Link>
                        <Link
                            href="#features"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Features
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <Hero />

            {/* Features Section */}
            <section id="features" className="container py-20 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Everything you need to{" "}
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            stand out
                        </span>
                    </h2>
                    <p className="mt-4 max-w-[600px] mx-auto text-lg text-muted-foreground">
                        Powerful features to build your perfect resume, fast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div
                                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}
                            >
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t bg-muted/30">
                <div className="container flex flex-col items-center gap-6 py-20 px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to build your resume?
                    </h2>
                    <p className="max-w-[500px] text-muted-foreground text-lg">
                        Join thousands of job seekers who landed interviews with
                        ResumeForge.
                    </p>
                    <Link href="/login">
                        <Button
                            size="lg"
                            className="text-base px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25"
                        >
                            Start Building — It&apos;s Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-8">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-xs">
                            R
                        </div>
                        <span className="font-semibold">ResumeForge</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} ResumeForge. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
