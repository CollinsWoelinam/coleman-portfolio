import Link from "next/link";
import Image from "next/image";
import { getStories } from "@/lib/db/data-store";
import { BookOpen, Calendar, Clock, Plus, Eye, Edit } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminStoriesPage() {
  const stories = await getStories({ publishedOnly: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            Editorial Management
          </span>
          <h1 className="font-serif text-3xl text-[#F5F5F0]">
            Field Stories & Journal
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Publish behind-the-lens articles, optical guides, and species encounters.
          </p>
        </div>

        <button
          onClick={undefined}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:bg-[#A2B384] transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-[#181818] border border-[#282828] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1F1F1F] text-[#888888] font-mono uppercase tracking-wider border-b border-[#2A2A2A]">
              <tr>
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424] text-[#CCCCCC]">
              {stories.map((story) => (
                <tr key={story.id} className="hover:bg-[#1E1E1E]/50 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-[#121212] border border-[#2E2E2E] shrink-0">
                        <Image
                          src={story.cover_image_url}
                          alt={story.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#F5F5F0]">{story.title}</p>
                        <p className="text-[11px] text-[#737373] line-clamp-1">{story.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#A0A0A0]">
                    {story.category || "General"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">
                    {story.published_at ? new Date(story.published_at).toLocaleDateString() : "Draft"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-950/50 text-emerald-300 border border-emerald-800/60">
                      {story.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/stories/${story.slug}`}
                        target="_blank"
                        className="p-1.5 rounded text-[#737373] hover:text-[#F5F5F0] hover:bg-[#282828] transition"
                        title="View Public Story"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

