import { db } from "./index";
import { photographs, categories, stories, contactMessages } from "./schema";
import { eq, desc, and } from "drizzle-orm";
import { Category, Photograph, Story, ContactMessage } from "../types";
import { INITIAL_CATEGORIES, INITIAL_PHOTOGRAPHS, INITIAL_STORIES } from "../mock-data";

// In-memory runtime cache for development / preview when DATABASE_URL is not yet connected
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryPhotographs: Photograph[] = [...INITIAL_PHOTOGRAPHS];
let memoryStories: Story[] = [...INITIAL_STORIES];
let memoryMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Dr. Evelyn Reed",
    email: "evelyn.reed@nature-conservation.org",
    subject: "Exhibition Licensing Inquiry - Chrysis Ignita Series",
    message: "Greetings Cole, we are preparing an interactive entomology gallery for our national science pavilion next spring and were deeply impressed by your Cuckoo Wasp macro series. Would love to discuss licensing terms.",
    is_read: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "msg-2",
    name: "Marcus Vance",
    email: "marcus@aperturewildlife.com",
    subject: "Print Order & Gallery Inquiries",
    message: "Incredible work with the Regal Jumper. Looking to purchase a 36x24 archival Hahnemühle fine art print for our studio. Please let me know available options.",
    is_read: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

// Helper: Slugify string
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

/* -------------------------------------------------------------
 * CATEGORIES
 * ------------------------------------------------------------- */
export async function getCategories(): Promise<Category[]> {
  if (db) {
    try {
      const records = await db.select().from(categories);
      if (records.length > 0) {
        return records.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          created_at: c.createdAt ? c.createdAt.toISOString() : undefined,
        }));
      }
    } catch (err) {
      console.warn("Neon DB error fetching categories, using fallback:", err);
    }
  }

  // Calculate live count from current photographs
  return memoryCategories.map((cat) => {
    const count = memoryPhotographs.filter(
      (p) => (p.category_id === cat.id || p.category_slug === cat.slug) && p.is_published
    ).length;
    return { ...cat, count };
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) || null;
}

/* -------------------------------------------------------------
 * PHOTOGRAPHS
 * ------------------------------------------------------------- */
interface GetPhotographsOptions {
  categorySlug?: string;
  search?: string;
  featuredOnly?: boolean;
  publishedOnly?: boolean;
}

export async function getPhotographs(options: GetPhotographsOptions = {}): Promise<Photograph[]> {
  const { categorySlug, search, featuredOnly, publishedOnly = true } = options;

  if (db) {
    try {
      const query = db
        .select({
          id: photographs.id,
          title: photographs.title,
          slug: photographs.slug,
          common_name: photographs.commonName,
          scientific_name: photographs.scientificName,
          description: photographs.description,
          interesting_facts: photographs.interestingFacts,
          image_url: photographs.imageUrl,
          cloudinary_public_id: photographs.cloudinaryPublicId,
          width: photographs.width,
          height: photographs.height,
          format: photographs.format,
          category_id: photographs.categoryId,
          category_name: categories.name,
          category_slug: categories.slug,
          capture_date: photographs.captureDate,
          camera_equipment: photographs.cameraEquipment,
          photography_technique: photographs.photographyTechnique,
          is_featured: photographs.isFeatured,
          is_published: photographs.isPublished,
          created_at: photographs.createdAt,
          updated_at: photographs.updatedAt,
        })
        .from(photographs)
        .leftJoin(categories, eq(photographs.categoryId, categories.id))
        .orderBy(desc(photographs.createdAt));

      const rows = await query;
      if (rows && rows.length > 0) {
        let results = rows.map((r) => ({
          ...r,
          capture_date: r.capture_date ? String(r.capture_date) : null,
          category_name: r.category_name ?? undefined,
          category_slug: r.category_slug ?? undefined,
          created_at: r.created_at ? r.created_at.toISOString() : undefined,
          updated_at: r.updated_at ? r.updated_at.toISOString() : undefined,
        }));

        if (publishedOnly) {
          results = results.filter((p) => p.is_published);
        }
        if (featuredOnly) {
          results = results.filter((p) => p.is_featured);
        }
        if (categorySlug && categorySlug !== "all") {
          results = results.filter((p) => p.category_slug === categorySlug);
        }
        if (search && search.trim().length > 0) {
          const q = search.toLowerCase();
          results = results.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.common_name.toLowerCase().includes(q) ||
              p.scientific_name.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q)
          );
        }
        return results;
      }
    } catch (err) {
      console.warn("Neon DB error fetching photographs, using fallback:", err);
    }
  }

  // Memory fallback filter
  let list = [...memoryPhotographs];

  if (publishedOnly) {
    list = list.filter((p) => p.is_published);
  }
  if (featuredOnly) {
    list = list.filter((p) => p.is_featured);
  }
  if (categorySlug && categorySlug !== "all") {
    list = list.filter((p) => p.category_slug === categorySlug || p.category_id === categorySlug);
  }
  if (search && search.trim().length > 0) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.common_name.toLowerCase().includes(q) ||
        p.scientific_name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getPhotographBySlug(slug: string): Promise<Photograph | null> {
  const all = await getPhotographs({ publishedOnly: false });
  return all.find((p) => p.slug === slug) || null;
}

export async function getPhotographById(id: string): Promise<Photograph | null> {
  const all = await getPhotographs({ publishedOnly: false });
  return all.find((p) => p.id === id) || null;
}

export async function createPhotograph(data: Omit<Photograph, "id" | "created_at" | "updated_at">): Promise<Photograph> {
  const id = `photo-${Date.now()}`;
  const now = new Date().toISOString();
  const slug = data.slug || slugify(data.title);

  // Look up category name/slug
  const cat = memoryCategories.find((c) => c.id === data.category_id || c.slug === data.category_id);
  const newPhoto: Photograph = {
    ...data,
    id,
    slug,
    category_name: cat ? cat.name : "Wildlife",
    category_slug: cat ? cat.slug : "other-wildlife",
    created_at: now,
    updated_at: now,
  };

  if (db) {
    try {
      await db.insert(photographs).values({
        id: crypto.randomUUID(),
        title: data.title,
        slug,
        commonName: data.common_name,
        scientificName: data.scientific_name,
        description: data.description,
        interestingFacts: data.interesting_facts || null,
        imageUrl: data.image_url,
        cloudinaryPublicId: data.cloudinary_public_id,
        width: data.width || 1600,
        height: data.height || 1067,
        format: data.format || "jpg",
        categoryId: data.category_id,
        cameraEquipment: data.camera_equipment || null,
        photographyTechnique: data.photography_technique || null,
        isFeatured: data.is_featured,
        isPublished: data.is_published,
      });
    } catch (err) {
      console.warn("Neon DB insert failed, preserved in memory:", err);
    }
  }

  memoryPhotographs.unshift(newPhoto);
  return newPhoto;
}

export async function updatePhotograph(id: string, updates: Partial<Photograph>): Promise<Photograph | null> {
  const index = memoryPhotographs.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Photograph = {
    ...memoryPhotographs[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (updates.category_id) {
    const cat = memoryCategories.find((c) => c.id === updates.category_id || c.slug === updates.category_id);
    if (cat) {
      updated.category_name = cat.name;
      updated.category_slug = cat.slug;
    }
  }

  memoryPhotographs[index] = updated;

  if (db) {
    try {
      await db
        .update(photographs)
        .set({
          title: updated.title,
          slug: updated.slug,
          commonName: updated.common_name,
          scientificName: updated.scientific_name,
          description: updated.description,
          interestingFacts: updated.interesting_facts,
          imageUrl: updated.image_url,
          categoryId: updated.category_id,
          cameraEquipment: updated.camera_equipment,
          photographyTechnique: updated.photography_technique,
          isFeatured: updated.is_featured,
          isPublished: updated.is_published,
          updatedAt: new Date(),
        })
        .where(eq(photographs.id, id));
    } catch (err) {
      console.warn("Neon DB update error:", err);
    }
  }

  return updated;
}

export async function deletePhotograph(id: string): Promise<boolean> {
  const index = memoryPhotographs.findIndex((p) => p.id === id);
  if (index === -1) return false;

  memoryPhotographs.splice(index, 1);

  if (db) {
    try {
      await db.delete(photographs).where(eq(photographs.id, id));
    } catch (err) {
      console.warn("Neon DB delete error:", err);
    }
  }

  return true;
}

/* -------------------------------------------------------------
 * STORIES / JOURNAL
 * ------------------------------------------------------------- */
export async function getStories(options: { publishedOnly?: boolean } = {}): Promise<Story[]> {
  const { publishedOnly = true } = options;

  if (db) {
    try {
      const rows = await db.select().from(stories).orderBy(desc(stories.createdAt));
      if (rows.length > 0) {
        let results = rows.map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          cover_image_url: s.coverImageUrl,
          cover_image_public_id: s.coverImagePublicId,
          excerpt: s.excerpt,
          content: s.content,
          category: s.category,
          is_published: s.isPublished,
          published_at: s.publishedAt ? s.publishedAt.toISOString() : undefined,
          created_at: s.createdAt ? s.createdAt.toISOString() : undefined,
          updated_at: s.updatedAt ? s.updatedAt.toISOString() : undefined,
        }));
        if (publishedOnly) {
          results = results.filter((s) => s.is_published);
        }
        return results;
      }
    } catch (err) {
      console.warn("Neon DB stories error, using fallback:", err);
    }
  }

  if (publishedOnly) {
    return memoryStories.filter((s) => s.is_published);
  }
  return memoryStories;
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const all = await getStories({ publishedOnly: false });
  return all.find((s) => s.slug === slug) || null;
}

/* -------------------------------------------------------------
 * CONTACT MESSAGES
 * ------------------------------------------------------------- */
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (db) {
    try {
      const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      if (rows.length > 0) {
        return rows.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          subject: m.subject,
          message: m.message,
          is_read: m.isRead,
          created_at: m.createdAt ? m.createdAt.toISOString() : undefined,
        }));
      }
    } catch (err) {
      console.warn("Neon DB contact fetch error:", err);
    }
  }

  return memoryMessages;
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const id = `msg-${Date.now()}`;
  const record: ContactMessage = {
    id,
    ...data,
    is_read: false,
    created_at: new Date().toISOString(),
  };

  if (db) {
    try {
      await db.insert(contactMessages).values({
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        isRead: false,
      });
    } catch (err) {
      console.warn("Neon DB contact insert error:", err);
    }
  }

  memoryMessages.unshift(record);
  return record;
}

export async function markContactMessageRead(id: string): Promise<boolean> {
  const msg = memoryMessages.find((m) => m.id === id);
  if (msg) {
    msg.is_read = true;
  }

  if (db) {
    try {
      await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
    } catch (err) {
      console.warn("Neon DB contact read error:", err);
    }
  }

  return true;
}

/* -------------------------------------------------------------
 * ADMIN STATS
 * ------------------------------------------------------------- */
export async function getAdminStats() {
  const photos = await getPhotographs({ publishedOnly: false });
  const cats = await getCategories();
  const st = await getStories({ publishedOnly: false });
  const msgs = await getContactMessages();

  return {
    totalPhotographs: photos.length,
    publishedPhotographs: photos.filter((p) => p.is_published).length,
    featuredPhotographs: photos.filter((p) => p.is_featured).length,
    totalCategories: cats.length,
    totalStories: st.length,
    totalMessages: msgs.length,
    unreadMessages: msgs.filter((m) => !m.is_read).length,
  };
}

