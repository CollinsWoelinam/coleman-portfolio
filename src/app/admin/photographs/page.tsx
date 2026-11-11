import PhotographManager from "./PhotographManager";
import { getPhotographs, getCategories } from "@/lib/db/data-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPhotographsPage() {
  const [photos, categories] = await Promise.all([
    getPhotographs({ publishedOnly: false }),
    getCategories(),
  ]);

  return (
    <div className="space-y-8">
      <div className="border-b border-[#242424] pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
          Content Catalog
        </span>
        <h1 className="font-serif text-3xl text-[#F5F5F0]">
          Manage Photographs
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          Catalog, edit, feature, and coordinate Cloudinary image deletions.
        </p>
      </div>

      <PhotographManager
        initialPhotographs={photos}
        categories={categories}
      />
    </div>
  );
}

