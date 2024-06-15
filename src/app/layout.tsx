import { Provider as WrapProvider } from "react-wrap-balancer";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { siteConfig } from "@/data/site/site";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: siteConfig.title,
    applicationName: siteConfig.title,

    description: siteConfig.description,
    keywords: siteConfig.keywords,

    creator: siteConfig.creator,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <WrapProvider>{children}</WrapProvider>
            </body>
        </html>
    );
}
