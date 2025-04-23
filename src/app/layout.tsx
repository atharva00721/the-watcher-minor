import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { openAiSans, jetBrainsMono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "The Watcher | Real-time Monitoring Platform",
  description:
    "A comprehensive monitoring application for tracking system performance and activity in real-time",
  keywords: [
    "monitoring",
    "dashboard",
    "real-time",
    "analytics",
    "system monitoring",
    "performance tracking",
  ],
  authors: [{ name: "The Watcher Team" }],
  creator: "The Watcher",
  publisher: "The Watcher",
  robots: "index, follow",
  metadataBase: new URL("https://watcher.arvie.tech"),
  openGraph: {
    title: "The Watcher | Real-time Monitoring Platform",
    description: "Comprehensive real-time monitoring and analytics dashboard",
    url: "https://watcher.arvie.tech",
    siteName: "The Watcher",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Watcher Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Watcher | Real-time Monitoring Platform",
    description: "Comprehensive real-time monitoring and analytics dashboard",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetBrainsMono.variable} ${openAiSans.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
