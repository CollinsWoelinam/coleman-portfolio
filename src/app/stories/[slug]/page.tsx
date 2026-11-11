import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStoryBySlug, getStories } from "@/lib/db/data-store";
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, Compass } from "lucide-react";

interface StoryDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: StoryDetailPageProps): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} — Journal`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: story.cover_image_url, width: 1200, height: 800, alt: story.title }],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const story = await getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  // Related stories
  const otherStories = (await getStories({ publishedOnly: true }))
    .filter((s) => s.id !== story.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <article className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Navigation */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A0A0A0] hover:text-[#84936A] transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        {/* Header Title Section */}
        <div className="space-y-4 border-b border-[#242424] pb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#84936A]">
            {story.category && (
              <span className="px-2.5 py-1 rounded bg-[#1E1E1E] border border-[#2E2E2E] uppercase tracking-widest">
                {story.category}
              </span>
            )}
            {story.published_at && (
              <span className="flex items-center gap-1.5 text-[#737373]">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(story.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {story.read_time && (
              <span className="flex items-center gap-1.5 text-[#737373]">
                <Clock className="w-3.5 h-3.5" />
                {story.read_time}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F0] leading-tight">
            {story.title}
          </h1>

          <p className="text-base sm:text-lg text-[#B0B0B0] font-light leading-relaxed">
            {story.excerpt}
          </p>
        </div>

        {/* Featured Cover Photograph */}
        <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#161616] border border-[#282828] shadow-2xl">
          <Image
            src={story.cover_image_url}
            alt={story.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-base sm:text-lg text-[#CCCCCC] font-light leading-relaxed space-y-6 border-b border-[#242424] pb-12 whitespace-pre-line">
          {story.content}
        </div>

        {/* Author Bio Banner */}
        <div className="p-8 rounded-sm bg-[#181818] border border-[#262626] flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#84936A]">
            <Image
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=400&q=80"
              alt="Cole_man portrait"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg text-[#F5F5F0]">Cole_man</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Macro wildlife specialist and natural history photographer. Documenting biodiversity with extreme focus stacks and zero specimen harm.
            </p>
            <div className="pt-2">
              <Link href="/gallery" className="text-xs font-mono uppercase tracking-widest text-[#84936A] hover:underline">
                View Photographic Portfolio →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {otherStories.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="font-serif text-2xl text-[#F5F5F0]">More Field Dispatches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherStories.map((item) => (
                <Link
                  key={item.id}
                  href={`/stories/${item.slug}`}
                  className="p-6 rounded-sm bg-[#161616] border border-[#262626] hover:border-[#84936A]/50 transition group space-y-3"
                >
                  <span className="text-[10px] font-mono text-[#84936A] uppercase tracking-widest">
                    {item.category || "Journal"}
                  </span>
                  <h4 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#84936A] transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#888888] line-clamp-2">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

