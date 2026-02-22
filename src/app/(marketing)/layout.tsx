import Link from "next/link"
import React from "react"

interface MarketingLayoutProps {
    children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">

            <main className="flex-1">{children}</main>

        </div>
    )
}
