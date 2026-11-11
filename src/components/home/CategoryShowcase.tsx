import Link from "next/link";
import { Category } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface CategoryShowcaseProps {
  categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="py-24 bg-[#161616] border-y border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            Taxonomic Exploration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0]">
            Photography Categories
          </h2>
          <p className="text-sm text-[#A0A0A0] leading-relaxed">
            From the microscopic ommatidia of dragonflies to broad temperate rainforest canopies,
            explore the portfolio organized by taxonomic class and natural biomes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/gallery?category=${category.slug}`}
              className="group p-6 rounded-sm bg-[#1E1E1E] border border-[#2B2B2B] hover:border-[#84936A]/70 hover:bg-[#232323] transition-all duration-300 flex flex-col justify-between min-h-[170px]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#84936A]">
                  <span className="uppercase tracking-wider">
                    {category.count ? `${category.count} Species` : "Collection"}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#737373] group-hover:text-[#84936A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F5F0] group-hover:text-[#84936A] transition-colors">
                  {category.name}
                </h3>
              </div>

              <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed pt-2">
                {category.description || "Field documentation and intimate portraits."}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

