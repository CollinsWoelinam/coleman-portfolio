"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photograph, Category } from "@/lib/types";
import {
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface PhotographManagerProps {
  initialPhotographs: Photograph[];
  categories: Category[];
}

export default function PhotographManager({
  initialPhotographs,
  categories,
}: PhotographManagerProps) {
  const [photos, setPhotos] = useState<Photograph[]>(initialPhotographs);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPhotos = photos.filter((p) => {
    const matchesCat =
      selectedCategory === "all" ||
      p.category_slug === selectedCategory ||
      p.category_id === selectedCategory;

    if (!matchesCat) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.common_name.toLowerCase().includes(q) ||
      p.scientific_name.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"? This will remove the database record and delete the image file from Cloudinary.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/photographs?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete photograph");
      }

      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete photograph");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (photo: Photograph) => {
    const updatedStatus = !photo.is_published;
    try {
      const res = await fetch("/api/admin/photographs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: photo.id,
          is_published: updatedStatus,
        }),
      });

      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, is_published: updatedStatus } : p))
        );
      }
    } catch (err) {
      console.error("Toggle publish failed", err);
    }
  };

  const handleToggleFeatured = async (photo: Photograph) => {
    const updatedFeatured = !photo.is_featured;
    try {
      const res = await fetch("/api/admin/photographs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: photo.id,
          is_featured: updatedFeatured,
        }),
      });

      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) => (p.id === photo.id ? { ...p, is_featured: updatedFeatured } : p))
        );
      }
    } catch (err) {
      console.error("Toggle featured failed", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#181818] p-4 rounded-sm border border-[#282828]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter photographs by species..."
            className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm pl-9 pr-3 py-2 text-xs text-[#F5F5F0]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-3 py-2 text-xs text-[#F5F5F0]"
          >
            <option value="all">All Categories ({photos.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <Link
            href="/admin/photographs/new"
            className="shrink-0 px-4 py-2 rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:bg-[#A2B384] transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Upload</span>
          </Link>
        </div>
      </div>

      {/* Photographs Table */}
      <div className="bg-[#181818] border border-[#282828] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1F1F1F] text-[#888888] font-mono uppercase tracking-wider border-b border-[#2A2A2A]">
              <tr>
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Common & Scientific Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424] text-[#CCCCCC]">
              {filteredPhotos.map((photo) => (
                <tr key={photo.id} className="hover:bg-[#1E1E1E]/50 transition">
                  {/* Thumbnail */}
                  <td className="py-3.5 px-4">
                    <div className="relative w-14 h-14 rounded overflow-hidden bg-[#121212] border border-[#2E2E2E]">
                      <Image
                        src={photo.image_url}
                        alt={photo.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Species Name */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-medium text-[#F5F5F0] truncate">{photo.common_name}</p>
                    <p className="text-[11px] italic text-[#84936A] font-serif truncate">{photo.scientific_name}</p>
                    <p className="text-[10px] text-[#737373] font-mono mt-0.5 truncate">{photo.title}</p>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#A0A0A0]">
                    {photo.category_name || "Species"}
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(photo)}
                      title={photo.is_featured ? "Remove from featured" : "Promote to featured"}
                      className={`p-1.5 rounded transition ${
                        photo.is_featured
                          ? "text-amber-400 hover:text-amber-300"
                          : "text-[#444444] hover:text-[#777777]"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${photo.is_featured ? "fill-amber-400" : ""}`} />
                    </button>
                  </td>

                  {/* Published Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleTogglePublish(photo)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition border ${
                        photo.is_published
                          ? "bg-emerald-950/50 text-emerald-300 border-emerald-800/60"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      {photo.is_published ? "Published" : "Draft"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/gallery/${photo.slug}`}
                        target="_blank"
                        className="p-1.5 rounded text-[#737373] hover:text-[#F5F5F0] hover:bg-[#282828] transition"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/photographs/${photo.id}/edit`}
                        className="p-1.5 rounded text-[#737373] hover:text-[#84936A] hover:bg-[#282828] transition"
                        title="Edit Photograph"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(photo.id, photo.title)}
                        disabled={deletingId === photo.id}
                        className="p-1.5 rounded text-[#737373] hover:text-rose-400 hover:bg-rose-950/30 transition disabled:opacity-50"
                        title="Delete from Neon & Cloudinary"
                      >
                        {deletingId === photo.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
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

