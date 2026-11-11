"use client";

import { Category } from "@/lib/types";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="space-y-6">
      {/* Search and stats bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by species, common name, or genus..."
            className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm pl-10 pr-9 py-2.5 text-xs text-[#F5F5F0] placeholder-[#666666] transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#F5F5F0]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter readout */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#888888] w-full sm:w-auto justify-end">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#84936A]" />
          <span>Showing</span>
          <span className="text-[#84936A] font-semibold">{totalCount}</span>
          <span>{totalCount === 1 ? "photograph" : "photographs"}</span>
        </div>
      </div>

      {/* Category Pills list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        <button
          onClick={() => onSelectCategory("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-200 border ${
            selectedCategory === "all"
              ? "bg-[#84936A] text-[#121212] font-semibold border-[#84936A] shadow-md shadow-[#84936A]/20"
              : "bg-[#181818] text-[#A0A0A0] border-[#2A2A2A] hover:border-[#84936A]/40 hover:text-[#F5F5F0]"
          }`}
        >
          All Species
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-200 border flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[#84936A] text-[#121212] font-semibold border-[#84936A] shadow-md shadow-[#84936A]/20"
                  : "bg-[#181818] text-[#A0A0A0] border-[#2A2A2A] hover:border-[#84936A]/40 hover:text-[#F5F5F0]"
              }`}
            >
              <span>{cat.name}</span>
              {typeof cat.count === "number" && cat.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? "bg-[#121212]/20 text-[#121212]"
                      : "bg-[#282828] text-[#84936A]"
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

