import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Cole_man — Wildlife & Nature Photography",
    template: "%s | Cole_man Photography",
  },
  description:
    "Capturing the Extraordinary in the Ordinary. Exploring the intricate beauty of insects, macro arachnids, avian life, and pristine natural habitats through high-magnification photography.",
  keywords: [
    "wildlife photography",
    "macro photography",
    "insect photography",
    "nature portfolio",
    "Cole_man",
    "jumping spiders",
    "cuckoo wasp",
    "biodiversity",
  ],
  authors: [{ name: "Cole_man" }],
  openGraph: {
    title: "Cole_man — Wildlife & Nature Photography",
    description: "Capturing the Extraordinary in the Ordinary.",
    url: "https://coleman-photography.vercel.app",
    siteName: "Cole_man Photography",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Cole_man Wildlife Photography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cole_man — Wildlife & Nature Photography",
    description: "Capturing the Extraordinary in the Ordinary.",
    images: ["https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#121212] text-[#F5F5F0] flex flex-col font-sans antialiased selection:bg-[#84936A] selection:text-[#121212]">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
