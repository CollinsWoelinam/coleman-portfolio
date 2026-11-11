"use client";

import { useState } from "react";
import Link from "next/link";
import { Photograph } from "@/lib/types";
import PhotographCard from "@/components/gallery/PhotographCard";
import LightboxModal from "@/components/gallery/LightboxModal";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedGalleryProps {
  photographs: Photograph[];
}

export default function FeaturedGallery({ photographs }: FeaturedGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<Photograph | null>(null);

  return (
    <section className="py-24 bg-[#121212] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242424] pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#84936A] text-xs uppercase tracking-[0.25em] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0]">
              Featured Photographs
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#84936A] hover:text-[#A2B384] transition group font-medium"
          >
            <span>View All Works ({photographs.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Photographs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photographs.slice(0, 6).map((photo, i) => (
            <PhotographCard
              key={photo.id}
              photograph={photo}
              onOpenLightbox={(p) => setActivePhoto(p)}
              priority={i < 3}
            />
          ))}
        </div>

        {/* Lightbox */}
        <LightboxModal
          photograph={activePhoto}
          allPhotographs={photographs}
          onClose={() => setActivePhoto(null)}
          onSelect={(p) => setActivePhoto(p)}
        />
      </div>
    </section>
  );
}

