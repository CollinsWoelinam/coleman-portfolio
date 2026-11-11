"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Category, Photograph } from "@/lib/types";
import CategoryFilter from "./CategoryFilter";
import PhotographCard from "./PhotographCard";
import LightboxModal from "./LightboxModal";
import { Camera, Sparkles } from "lucide-react";

interface GalleryGridProps {
  initialPhotographs: Photograph[];
  categories: Category[];
  initialCategory?: string;
}

export default function GalleryGrid({
  initialPhotographs,
  categories,
  initialCategory = "all",
}: GalleryGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL query parameter synchronization
  const categoryParam = searchParams.get("category") || initialCategory;
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<Photograph | null>(null);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(window.location.search);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const newRelativePathQuery = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
    router.push(newRelativePathQuery, { scroll: false });
  };

  // Filtered photograph list
  const filteredPhotographs = useMemo(() => {
    return initialPhotographs.filter((photo) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" ||
        photo.category_slug === selectedCategory ||
        photo.category_id === selectedCategory;

      if (!matchesCategory) return false;

      // Search query match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        photo.title.toLowerCase().includes(q) ||
        photo.common_name.toLowerCase().includes(q) ||
        photo.scientific_name.toLowerCase().includes(q) ||
        photo.description.toLowerCase().includes(q) ||
        (photo.interesting_facts && photo.interesting_facts.toLowerCase().includes(q))
      );
    });
  }, [initialPhotographs, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Category filter & search */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={filteredPhotographs.length}
      />

      {/* Grid */}
      {filteredPhotographs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotographs.map((photo, index) => (
            <PhotographCard
              key={photo.id}
              photograph={photo}
              onOpenLightbox={(p) => setActiveLightboxPhoto(p)}
              priority={index < 4}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-20 px-4 bg-[#181818] border border-dashed border-[#2E2E2E] rounded-sm space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#262626] flex items-center justify-center text-[#84936A]">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl text-[#F5F5F0]">No photographs found</h3>
          <p className="text-xs text-[#888888] max-w-md mx-auto">
            {searchQuery
              ? `No species or photographs matched "${searchQuery}". Try searching for another common or scientific name.`
              : "No photographs have been cataloged in this category yet. Check back soon for new field expeditions."}
          </p>
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategorySelect("all");
              }}
              className="text-xs uppercase tracking-wider text-[#84936A] hover:underline pt-2 inline-block font-mono"
            >
              Reset filters & search
            </button>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        photograph={activeLightboxPhoto}
        allPhotographs={filteredPhotographs}
        onClose={() => setActiveLightboxPhoto(null)}
        onSelect={(p) => setActiveLightboxPhoto(p)}
      />
    </div>
  );
}

