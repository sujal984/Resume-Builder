import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Palette } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

            <div className="container flex flex-col items-center gap-8 text-center py-20 md:py-32 px-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI-Powered Resume Builder
                </div>

                {/* Heading */}
                <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Build your{" "}
                    <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        perfect resume
                    </span>
                    <br />
                    in minutes.
                </h1>

                {/* Subtitle */}
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                    Create professional, ATS-friendly resumes with our AI-powered builder.
                    Choose from modern templates and download as PDF instantly.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link href="/login">
                        <Button
                            size="lg"
                            className="text-base px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/templates">
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-base px-8 py-6 border-2 hover:bg-accent transition-all"
                        >
                            View Templates
                        </Button>
                    </Link>
                </div>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                            <FileText className="h-4 w-4" />
                        </div>
                        Multiple Templates
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        AI Writing Assistant
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <Palette className="h-4 w-4" />
                        </div>
                        Theme Customization
                    </div>
                </div>
            </div>
        </section>
    );
}
