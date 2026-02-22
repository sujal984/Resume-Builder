import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditorLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            {/* Top Navbar for Editor */}
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold">Back to Dashboard</span>
                </Link>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm">Save</Button>
                    <Button size="sm">Download PDF</Button>
                </div>
            </header>

            {/* Main Content (Sidebar + Canvas) */}
            <div className="flex flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
