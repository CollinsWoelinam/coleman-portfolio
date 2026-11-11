"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photograph } from "@/lib/types";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Share2,
  Calendar,
  Camera,
  Layers,
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";

interface LightboxModalProps {
  photograph: Photograph | null;
  allPhotographs: Photograph[];
  onClose: () => void;
  onSelect: (photo: Photograph) => void;
}

export default function LightboxModal({
  photograph,
  allPhotographs,
  onClose,
  onSelect,
}: LightboxModalProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [copied, setCopied] = useState(false);

  const currentIndex = photograph
    ? allPhotographs.findIndex((p) => p.id === photograph.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(allPhotographs[currentIndex - 1]);
    } else {
      // Loop to end
      onSelect(allPhotographs[allPhotographs.length - 1]);
    }
  }, [currentIndex, allPhotographs, onSelect]);

  const handleNext = useCallback(() => {
    if (currentIndex < allPhotographs.length - 1) {
      onSelect(allPhotographs[currentIndex + 1]);
    } else {
      // Loop to start
      onSelect(allPhotographs[0]);
    }
  }, [currentIndex, allPhotographs, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    if (!photograph) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "i" || e.key === "I") setShowDetails((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [photograph, onClose, handlePrev, handleNext]);

  if (!photograph) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/gallery/${photograph.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
      {/* Top action bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-widest text-[#84936A] font-mono">
            {currentIndex + 1} / {allPhotographs.length}
          </span>
          <span className="text-sm font-serif text-[#F5F5F0] hidden sm:inline">
            {photograph.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`p-2 rounded-full border transition ${
              showDetails
                ? "bg-[#84936A] text-[#121212] border-[#84936A]"
                : "bg-[#1E1E1E]/80 text-[#A0A0A0] border-[#333333] hover:text-[#F5F5F0]"
            }`}
            title="Toggle Details (Press I)"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-full bg-[#1E1E1E]/80 text-[#A0A0A0] border border-[#333333] hover:text-[#F5F5F0] transition"
            title="Share Photograph"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#1E1E1E]/80 text-[#A0A0A0] border border-[#333333] hover:text-[#F5F5F0] hover:bg-rose-950/40 transition"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 text-[#F5F5F0] hover:bg-[#84936A] hover:text-[#121212] transition duration-200 border border-white/10"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 text-[#F5F5F0] hover:bg-[#84936A] hover:text-[#121212] transition duration-200 border border-white/10"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 pt-16">
        {/* Photo View */}
        <div className="relative flex-1 w-full h-[70vh] lg:h-[85vh] flex items-center justify-center">
          <Image
            src={photograph.image_url}
            alt={photograph.title}
            fill
            priority
            className="object-contain select-none"
            sizes="100vw"
          />
        </div>

        {/* Info Drawer Panel */}
        {showDetails && (
          <div className="w-full lg:w-96 max-h-[35vh] lg:max-h-[85vh] overflow-y-auto bg-[#181818]/90 border border-[#2A2A2A] rounded-sm p-6 lg:ml-6 mt-4 lg:mt-0 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#84936A] bg-[#84936A]/10 px-2 py-0.5 rounded border border-[#84936A]/30">
                  {photograph.category_name || "Species"}
                </span>
                <h2 className="font-serif text-2xl text-[#F5F5F0] mt-2">
                  {photograph.common_name}
                </h2>
                <p className="text-sm italic font-serif text-[#84936A]">
                  {photograph.scientific_name}
                </p>
              </div>

              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                {photograph.description}
              </p>

              {photograph.interesting_facts && (
                <div className="p-3.5 rounded bg-[#1F1F1F] border border-[#2E2E2E] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#84936A] font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Species Note</span>
                  </div>
                  <p className="text-[11px] text-[#A0A0A0] leading-normal">
                    {photograph.interesting_facts}
                  </p>
                </div>
              )}

              {/* Technical EXIF / Gear Info */}
              <div className="space-y-2 pt-2 border-t border-[#262626] text-[11px] text-[#A0A0A0]">
                {photograph.camera_equipment && (
                  <div className="flex items-start gap-2">
                    <Camera className="w-3.5 h-3.5 text-[#737373] mt-0.5 shrink-0" />
                    <span>{photograph.camera_equipment}</span>
                  </div>
                )}
                {photograph.photography_technique && (
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#737373] mt-0.5 shrink-0" />
                    <span>{photograph.photography_technique}</span>
                  </div>
                )}
                {photograph.capture_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                    <span>Captured on {photograph.capture_date}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#666666] tracking-wider uppercase font-mono">
                © Cole_man Photography
              </span>

              <Link
                href={`/gallery/${photograph.slug}`}
                onClick={onClose}
                className="inline-flex items-center text-[#84936A] hover:text-[#F5F5F0] transition font-medium"
              >
                <span>Full Story</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

