import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPhotographBySlug, getPhotographs } from "@/lib/db/data-store";
import {
  Calendar,
  Camera,
  Layers,
  Sparkles,
  ArrowLeft,
  Share2,
  Tag,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import PhotographCard from "@/components/gallery/PhotographCard";

interface PhotoDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PhotoDetailPageProps): Promise<Metadata> {
  const photo = await getPhotographBySlug(params.slug);
  if (!photo) return { title: "Photograph Not Found" };

  return {
    title: `${photo.common_name} (${photo.scientific_name})`,
    description: photo.description,
    openGraph: {
      title: `${photo.common_name} — Cole_man Photography`,
      description: photo.description,
      images: [{ url: photo.image_url, width: 1200, height: 800, alt: photo.title }],
    },
  };
}

export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const photo = await getPhotographBySlug(params.slug);

  if (!photo) {
    notFound();
  }

  // Related photos in the same category
  const relatedPhotos = (await getPhotographs({
    categorySlug: photo.category_slug,
    publishedOnly: true,
  }))
    .filter((p) => p.id !== photo.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: photo.title,
    caption: `${photo.common_name} (${photo.scientific_name})`,
    description: photo.description,
    contentUrl: photo.image_url,
    datePublished: photo.created_at,
    author: {
      "@type": "Person",
      name: "Cole_man",
    },
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Back navigation & actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A0A0A0] hover:text-[#84936A] transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>

          <Link
            href={`/gallery?category=${photo.category_slug}`}
            className="text-xs uppercase tracking-widest text-[#84936A] font-mono px-3 py-1 rounded bg-[#1E1E1E] border border-[#2E2E2E]"
          >
            {photo.category_name || "Species"}
          </Link>
        </div>

        {/* Main Photograph Visual Display */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[80vh] rounded-sm overflow-hidden bg-[#161616] border border-[#2A2A2A] shadow-2xl">
          <Image
            src={photo.image_url}
            alt={`${photo.common_name} (${photo.scientific_name})`}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          {/* Left Column: Taxonomic Details & Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#84936A]">
                Taxon Profile
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#F5F5F0]">
                {photo.common_name}
              </h1>
              <p className="font-serif italic text-xl text-[#84936A]">
                {photo.scientific_name}
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-base text-[#D0D0D0] leading-relaxed font-light space-y-4">
              <p>{photo.description}</p>
            </div>

            {/* Interesting facts callout */}
            {photo.interesting_facts && (
              <div className="p-6 rounded-sm bg-[#1A1A1A] border-l-2 border-[#84936A] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#84936A]">
                  <Sparkles className="w-4 h-4" />
                  <span>Biological Significance & Behavior</span>
                </div>
                <p className="text-sm text-[#CCCCCC] leading-relaxed">
                  {photo.interesting_facts}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Technical Metadata Card & Social Share */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-sm bg-[#181818] border border-[#262626] space-y-6">
              <h3 className="font-serif text-lg text-[#F5F5F0] border-b border-[#262626] pb-3">
                Field & Optical Data
              </h3>

              <div className="space-y-4 text-xs">
                {photo.camera_equipment && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373]">Equipment</span>
                    <div className="flex items-start gap-2 text-[#E0E0E0]">
                      <Camera className="w-4 h-4 text-[#84936A] shrink-0 mt-0.5" />
                      <span>{photo.camera_equipment}</span>
                    </div>
                  </div>
                )}

                {photo.photography_technique && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373]">Technique</span>
                    <div className="flex items-start gap-2 text-[#E0E0E0]">
                      <Layers className="w-4 h-4 text-[#84936A] shrink-0 mt-0.5" />
                      <span>{photo.photography_technique}</span>
                    </div>
                  </div>
                )}

                {photo.capture_date && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373]">Capture Date</span>
                    <div className="flex items-center gap-2 text-[#E0E0E0]">
                      <Calendar className="w-4 h-4 text-[#84936A] shrink-0" />
                      <span>{photo.capture_date}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Photographer</span>
                  <p className="text-[#E0E0E0] font-medium">Cole_man Wildlife Photography</p>
                </div>
              </div>

              {/* Share & Inquiries */}
              <div className="pt-4 border-t border-[#262626] space-y-3">
                <Link
                  href="/contact"
                  className="w-full py-3 text-center rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-widest hover:bg-[#A2B384] transition block"
                >
                  Inquire For Licensing / Print
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Species Section */}
        {relatedPhotos.length > 0 && (
          <div className="pt-16 border-t border-[#242424] space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#84936A]">
                More in this class
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0]">
                Related {photo.category_name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPhotos.map((item) => (
                <div key={item.id} className="space-y-2">
                  <Link
                    href={`/gallery/${item.slug}`}
                    className="block relative aspect-[4/3] rounded-sm overflow-hidden bg-[#1E1E1E] border border-[#282828] group"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <h4 className="text-sm font-medium text-[#F5F5F0] truncate">{item.common_name}</h4>
                  <p className="text-xs italic text-[#737373]">{item.scientific_name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

