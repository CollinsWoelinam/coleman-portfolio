import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getPhotographs,
  getPhotographById,
  createPhotograph,
  updatePhotograph,
  deletePhotograph,
} from "@/lib/db/data-store";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category") || undefined;
  const search = searchParams.get("q") || undefined;

  const photos = await getPhotographs({
    categorySlug,
    search,
    publishedOnly: false,
  });

  return NextResponse.json(photos);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!data.title || !data.common_name || !data.scientific_name || !data.image_url) {
      return NextResponse.json(
        { error: "Missing required fields (title, common_name, scientific_name, image_url)" },
        { status: 400 }
      );
    }

    const created = await createPhotograph({
      title: data.title,
      slug: data.slug,
      common_name: data.common_name,
      scientific_name: data.scientific_name,
      description: data.description || "",
      interesting_facts: data.interesting_facts || null,
      image_url: data.image_url,
      cloudinary_public_id: data.cloudinary_public_id || `cole_man_${Date.now()}`,
      width: data.width ? parseInt(data.width, 10) : 1600,
      height: data.height ? parseInt(data.height, 10) : 1067,
      format: data.format || "jpg",
      category_id: data.category_id || "cat-1",
      capture_date: data.capture_date || null,
      camera_equipment: data.camera_equipment || null,
      photography_technique: data.photography_technique || null,
      is_featured: Boolean(data.is_featured),
      is_published: data.is_published !== undefined ? Boolean(data.is_published) : true,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("Create photo error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to save photograph" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: "Photograph ID is required" }, { status: 400 });
    }

    const updated = await updatePhotograph(data.id, data);
    if (!updated) {
      return NextResponse.json({ error: "Photograph not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Update photo error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update photograph" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Photograph ID is required" }, { status: 400 });
    }

    const photo = await getPhotographById(id);
    if (!photo) {
      return NextResponse.json({ error: "Photograph not found" }, { status: 404 });
    }

    // 1. Delete image asset in Cloudinary to avoid orphaned assets
    if (photo.cloudinary_public_id) {
      await deleteCloudinaryAsset(photo.cloudinary_public_id);
    }

    // 2. Delete database record
    await deletePhotograph(id);

    return NextResponse.json({ success: true, message: "Photograph deleted from database and Cloudinary" });
  } catch (err: any) {
    console.error("Delete photo error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete photograph" },
      { status: 500 }
    );
  }
}

