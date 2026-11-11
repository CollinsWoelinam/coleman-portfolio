import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, varchar, integer, boolean, timestamp, uuid, date } from "drizzle-orm/pg-core";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.log("⚠️ DATABASE_URL is not defined. Please set it in your environment or .env.local");
  process.exit(1);
}

const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const photographs = pgTable("photographs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  commonName: varchar("common_name", { length: 255 }).notNull(),
  scientificName: varchar("scientific_name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  interestingFacts: text("interesting_facts"),
  imageUrl: text("image_url").notNull(),
  cloudinaryPublicId: varchar("cloudinary_public_id", { length: 255 }).notNull(),
  width: integer("width"),
  height: integer("height"),
  format: varchar("format", { length: 50 }),
  categoryId: uuid("category_id").notNull(),
  cameraEquipment: varchar("camera_equipment", { length: 255 }),
  photographyTechnique: varchar("photography_technique", { length: 255 }),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const SEED_CATEGORIES = [
  { name: "Insects", slug: "insects", description: "Intricate macro studies of beetles, mantises, bees, and arthropods." },
  { name: "Butterflies and Moths", slug: "butterflies-and-moths", description: "Vibrant wing scales, chrysalises, and ephemeral pollinators." },
  { name: "Spiders and Arachnids", slug: "spiders-and-arachnids", description: "Jumping spiders, orb-weavers, and predatory architectures." },
  { name: "Reptiles and Amphibians", slug: "reptiles-and-amphibians", description: "Tree frogs, chameleons, geckos, and jewel-scaled serpents." },
  { name: "Birds", slug: "birds", description: "Avian plumage, predatory raptors, and intimate behavioral moments." },
  { name: "Mammals", slug: "mammals", description: "Elusive forest dwellers, alpine grazers, and mammalian expressions." },
  { name: "Other Wildlife", slug: "other-wildlife", description: "Mollusks, crustaceans, and curiosities of the forest floor." },
  { name: "Nature and Landscapes", slug: "nature-and-landscapes", description: "Primeval woodlands, moss biomes, and dramatic wilderness habitats." },
];

async function seed() {
  console.log("🌱 Connecting to Neon Database...");
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  console.log("Inserting categories...");
  for (const cat of SEED_CATEGORIES) {
    try {
      await db.insert(categories).values(cat).onConflictDoNothing();
      console.log(`  ✓ Category: ${cat.name}`);
    } catch (err) {
      console.error(`  ✗ Error inserting ${cat.name}:`, err.message);
    }
  }

  console.log("✅ Seed completed successfully!");
}

seed().catch(console.error);

