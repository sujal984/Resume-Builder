import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { TEMPLATE_REGISTRY } from "@/lib/templates/registry";

export default function TemplatesPage() {
    const templates = Object.values(TEMPLATE_REGISTRY).map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        features: [
            template.atsScore >= 90 ? "ATS-Optimized" : "ATS-Friendly",
            template.category.charAt(0).toUpperCase() + template.category.slice(1),
            template.isPremium ? "Premium" : "Free"
        ],
        color: template.category === 'modern' ? "from-violet-600 to-indigo-600" :
               template.category === 'creative' ? "from-pink-600 to-rose-600" :
               template.category === 'minimal' ? "from-zinc-500 to-zinc-700" :
               "from-slate-600 to-slate-800",
        popular: template.atsScore >= 95,
        isPremium: template.isPremium,
    }));

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
                <div className="container flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-sm">
                            R
                        </div>
                        <span className="font-bold text-xl">ResumeForge</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </Link>
                        <Link href="/login">
                            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="container py-16 px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Resume{" "}
                    <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        Templates
                    </span>
                </h1>
                <p className="mt-4 max-w-[600px] mx-auto text-lg text-muted-foreground">
                    Choose a professionally designed template and customize it to match your style.
                </p>
            </section>

            {/* Templates Grid */}
            <section className="container px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="group relative rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {template.popular && (
                                <div className="absolute top-4 right-4 z-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-medium text-white">
                                    Popular
                                </div>
                            )}
                            {template.isPremium && (
                                <div className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-medium text-white">
                                    ⭐ Premium
                                </div>
                            )}

                            {/* Preview Area */}
                            <div className="h-64 bg-muted flex items-center justify-center relative overflow-hidden">
                                <img
                                    src={TEMPLATE_REGISTRY[template.id]?.thumbnail || "/templates/modern-thumb.png"}
                                    alt={`${template.name} preview`}
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {template.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium"
                                        >
                                            <Check className="h-3 w-3 text-emerald-500" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <Link href="/login">
                                    <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                                        Use Template
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-8 mt-auto">
                <div className="container flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-xs">
                            R
                        </div>
                        <span className="font-semibold">ResumeForge</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} ResumeForge
                    </p>
                </div>
            </footer>
        </div>
    );
}
