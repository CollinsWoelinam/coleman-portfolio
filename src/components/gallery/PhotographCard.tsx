"use client";

import Image from "next/image";
import Link from "next/link";
import { Photograph } from "@/lib/types";
import { Maximize2, ArrowUpRight } from "lucide-react";

interface PhotographCardProps {
  photograph: Photograph;
  onOpenLightbox: (photograph: Photograph) => void;
  priority?: boolean;
}

export default function PhotographCard({
  photograph,
  onOpenLightbox,
  priority = false,
}: PhotographCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-sm bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#84936A]/60 transition-all duration-300">
      {/* Image container */}
      <div
        onClick={() => onOpenLightbox(photograph)}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-[#181818]"
      >
        <Image
          src={photograph.image_url}
          alt={`${photograph.common_name} (${photograph.scientific_name})`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-[#121212]/80 backdrop-blur-sm text-[#84936A] border border-[#84936A]/30">
              {photograph.category_name || "Wildlife"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(photograph);
              }}
              title="Open Lightbox"
              className="p-2 rounded-full bg-[#121212]/80 text-[#F5F5F0] hover:bg-[#84936A] hover:text-[#121212] transition shadow-lg"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-lg text-[#F5F5F0] leading-tight drop-shadow-md">
              {photograph.common_name}
            </h3>
            <p className="text-xs italic text-[#A0A0A0] font-serif">
              {photograph.scientific_name}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-[#181818]/60 flex items-center justify-between border-t border-[#262626]">
        <div className="truncate mr-3">
          <h4 className="text-sm font-medium text-[#F5F5F0] truncate group-hover:text-[#84936A] transition">
            {photograph.title}
          </h4>
          <p className="text-xs text-[#737373] truncate font-mono">
            {photograph.camera_equipment || "Macro Field Study"}
          </p>
        </div>

        <Link
          href={`/gallery/${photograph.slug}`}
          className="p-1.5 text-[#737373] hover:text-[#F5F5F0] hover:bg-[#282828] rounded transition"
          title="View Species Details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

