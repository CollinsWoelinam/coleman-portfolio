import { Metadata } from "next";
import { Suspense } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getPhotographs, getCategories } from "@/lib/db/data-store";

export const metadata: Metadata = {
  title: "Gallery — Wildlife, Insects & Macro Photography",
  description:
    "Browse the comprehensive digital archive of wild insects, arachnids, amphibians, and natural habitats photographed by Cole_man.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const [photographs, categories] = await Promise.all([
    getPhotographs({ publishedOnly: true }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#242424] pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            Digital Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F0]">
            The Photography Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Filter through taxonomic orders, examine extreme macro focus-stacks, and explore the extraordinary
            anatomical details of species documented across diverse global habitats.
          </p>
        </div>

        {/* Gallery Grid wrapped in Suspense for search params */}
        <Suspense fallback={<div className="text-center py-24 text-xs font-mono text-[#737373]">Loading gallery collection...</div>}>
          <GalleryGrid
            initialPhotographs={photographs}
            categories={categories}
          />
        </Suspense>
      </div>
    </div>
  );
}

