import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStories } from "@/lib/db/data-store";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Field Journal & Stories — Cole_man",
  description:
    "Behind-the-lens essays, field techniques, optical science, and species encounters written by photographer Cole_man.",
};

export const revalidate = 60;

export default async function StoriesPage() {
  const stories = await getStories({ publishedOnly: true });

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#242424] pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Field Dispatches</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F0]">
            The Photography Journal
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Detailed field accounts, equipment experiments, species behavioral notes,
            and the quiet patience behind high-magnification macro photography.
          </p>
        </div>

        {/* Stories Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              className="group flex flex-col justify-between rounded-sm bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#84936A]/60 transition-all duration-300 overflow-hidden"
            >
              <div className="space-y-4">
                {/* Cover Image */}
                <Link
                  href={`/stories/${story.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden bg-[#141414]"
                >
                  <Image
                    src={story.cover_image_url}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {story.category && (
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#121212]/80 backdrop-blur-sm text-[#84936A] border border-[#84936A]/30">
                      {story.category}
                    </span>
                  )}
                </Link>

                {/* Content info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#737373]">
                    {story.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(story.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    {story.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {story.read_time}
                      </span>
                    )}
                  </div>

                  <Link href={`/stories/${story.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] group-hover:text-[#84936A] transition-colors leading-snug">
                      {story.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Story link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#84936A] group-hover:text-[#A2B384] transition"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

