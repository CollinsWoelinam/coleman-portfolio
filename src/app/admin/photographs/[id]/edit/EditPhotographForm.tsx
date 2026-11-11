"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Photograph, Category } from "@/lib/types";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";

interface EditPhotographFormProps {
  photograph: Photograph;
  categories: Category[];
}

export default function EditPhotographForm({
  photograph,
  categories,
}: EditPhotographFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: photograph.id,
    title: photograph.title,
    slug: photograph.slug,
    common_name: photograph.common_name,
    scientific_name: photograph.scientific_name,
    category_id: photograph.category_id,
    description: photograph.description,
    interesting_facts: photograph.interesting_facts || "",
    camera_equipment: photograph.camera_equipment || "",
    photography_technique: photograph.photography_technique || "",
    capture_date: photograph.capture_date || "",
    is_featured: photograph.is_featured,
    is_published: photograph.is_published,
    image_url: photograph.image_url,
    cloudinary_public_id: photograph.cloudinary_public_id,
  });

  const handleUploadSuccess = (result: {
    imageUrl: string;
    publicId: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      image_url: result.imageUrl,
      cloudinary_public_id: result.publicId,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/photographs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update photograph.");
      }

      router.push("/admin/photographs");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="border-b border-[#242424] pb-6">
        <Link
          href="/admin/photographs"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#737373] hover:text-[#84936A] transition mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Photograph List</span>
        </Link>
        <h1 className="font-serif text-3xl text-[#F5F5F0]">
          Edit: {photograph.common_name}
        </h1>
      </div>

      {error && (
        <div className="p-4 rounded bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photograph Media */}
        <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-4">
          <h2 className="font-serif text-lg text-[#F5F5F0]">Photograph Media</h2>
          <PhotoUploader
            initialImageUrl={formData.image_url}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        {/* Taxonomic Metadata */}
        <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-6">
          <h2 className="font-serif text-lg text-[#F5F5F0]">Species Metadata</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                Common Name *
              </label>
              <input
                type="text"
                name="common_name"
                required
                value={formData.common_name}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                Scientific Name *
              </label>
              <input
                type="text"
                name="scientific_name"
                required
                value={formData.scientific_name}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0] italic font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                Photograph Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
              Educational Description *
            </label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
              Interesting Species Facts
            </label>
            <textarea
              name="interesting_facts"
              rows={2}
              value={formData.interesting_facts}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0] resize-none"
            />
          </div>
        </div>

        {/* Optical Gear */}
        <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-6">
          <h2 className="font-serif text-lg text-[#F5F5F0]">Gear & Technique</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                Camera Equipment
              </label>
              <input
                type="text"
                name="camera_equipment"
                value={formData.camera_equipment}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                Photography Technique
              </label>
              <input
                type="text"
                name="photography_technique"
                value={formData.photography_technique}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-2.5 text-xs text-[#F5F5F0]"
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-4">
          <h2 className="font-serif text-lg text-[#F5F5F0]">Visibility Settings</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs text-[#E0E0E0]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#84936A] bg-[#282828] border-[#3E3E3E]"
              />
              <span>Published (Visible to visitors)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#84936A] bg-[#282828] border-[#3E3E3E]"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/photographs"
            className="px-6 py-3 rounded-sm bg-[#1F1F1F] text-[#A0A0A0] hover:text-[#F5F5F0] text-xs uppercase tracking-wider font-medium"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 rounded-sm bg-[#84936A] hover:bg-[#A2B384] text-[#121212] font-semibold text-xs uppercase tracking-[0.2em] transition flex items-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Updates</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

