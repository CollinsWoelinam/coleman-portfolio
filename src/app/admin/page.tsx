import Link from "next/link";
import Image from "next/image";
import { getAdminStats, getPhotographs } from "@/lib/db/data-store";
import {
  Images,
  UploadCloud,
  CheckCircle2,
  Star,
  BookOpen,
  Mail,
  ArrowRight,
  Plus,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Dynamic admin view

export default async function AdminDashboardPage() {
  const [stats, recentPhotos] = await Promise.all([
    getAdminStats(),
    getPhotographs({ publishedOnly: false }),
  ]);

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            Control Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F5F0]">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/photographs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:bg-[#A2B384] transition"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-sm bg-[#181818] border border-[#282828] space-y-2">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">Total Photos</span>
            <Images className="w-4 h-4 text-[#84936A]" />
          </div>
          <p className="font-serif text-3xl text-[#F5F5F0]">{stats.totalPhotographs}</p>
          <p className="text-[11px] text-[#737373]">{stats.publishedPhotographs} currently public</p>
        </div>

        <div className="p-5 rounded-sm bg-[#181818] border border-[#282828] space-y-2">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">Featured Works</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif text-3xl text-[#F5F5F0]">{stats.featuredPhotographs}</p>
          <p className="text-[11px] text-[#737373]">Promoted on homepage</p>
        </div>

        <div className="p-5 rounded-sm bg-[#181818] border border-[#282828] space-y-2">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">Field Stories</span>
            <BookOpen className="w-4 h-4 text-[#84936A]" />
          </div>
          <p className="font-serif text-3xl text-[#F5F5F0]">{stats.totalStories}</p>
          <p className="text-[11px] text-[#737373]">Journal dispatches published</p>
        </div>

        <div className="p-5 rounded-sm bg-[#181818] border border-[#282828] space-y-2">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">Inquiries</span>
            <Mail className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif text-3xl text-[#F5F5F0]">{stats.totalMessages}</p>
          <p className="text-[11px] text-emerald-400 font-medium">
            {stats.unreadMessages} unread messages
          </p>
        </div>
      </div>

      {/* Recent Photographs Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#F5F5F0]">Catalog Photographs</h2>
          <Link
            href="/admin/photographs"
            className="text-xs font-mono uppercase tracking-widest text-[#84936A] hover:underline flex items-center gap-1"
          >
            <span>View All & Manage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#181818] border border-[#282828] rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1F1F1F] text-[#888888] font-mono uppercase tracking-wider border-b border-[#2A2A2A]">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Species / Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242424] text-[#CCCCCC]">
                {recentPhotos.slice(0, 6).map((photo) => (
                  <tr key={photo.id} className="hover:bg-[#1E1E1E]/50 transition">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-[#121212] border border-[#2E2E2E]">
                        <Image
                          src={photo.image_url}
                          alt={photo.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-[#F5F5F0]">{photo.common_name}</p>
                      <p className="text-[11px] italic text-[#84936A] font-serif">{photo.scientific_name}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#A0A0A0]">
                      {photo.category_name || "Wildlife"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono ${
                          photo.is_published
                            ? "bg-emerald-950/50 text-emerald-300 border border-emerald-800/60"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {photo.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/photographs/${photo.id}/edit`}
                        className="text-xs text-[#84936A] hover:underline font-mono"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

