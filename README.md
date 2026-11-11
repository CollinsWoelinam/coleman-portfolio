# Cole_man — Wildlife & Nature Photography Portfolio

> **"Capturing the Extraordinary in the Ordinary."**

Cole_man is a modern, minimal, editorial-grade photography portfolio and content management system dedicated to showcasing high-magnification macro and wildlife photography (insects, arachnids, amphibians, reptiles, avian, and primeval habitats).

---

## 📸 Key Features

- **Responsive Visual Gallery**: Filter across 8 taxonomic categories, real-time species search, and high-performance image cards.
- **Immersive Fullscreen Lightbox**: Keyboard navigation (`Left`/`Right`/`Esc`/`I`), zoom view, species details drawer, EXIF/optical technique breakdown, and social sharing.
- **Species Detail Profiles** (`/gallery/[slug]`): Full taxonomic names, biological behavioral significance, camera gear notes, and related species links.
- **Field Journal & Stories** (`/stories`): Behind-the-lens essays detailing optical science (structural light, nanostructures, cross-polarization) and field expeditions.
- **Editorial Design System**: Built with Next.js 14 App Router, Tailwind CSS, and Framer Motion adhering to the palette: Deep Charcoal (`#121212`), Dark Grey (`#1E1E1E`), Natural Olive Green (`#84936A`), and Off-White (`#F5F5F0`).
- **Secure Administrator Dashboard** (`/admin`):
  - Direct signed client-to-Cloudinary image uploads (API secret remains strictly server-side).
  - Add, edit, feature, and delete photographs with automatic Cloudinary asset cleanup to prevent orphaned media.
  - Manage field stories and review inbound contact inquiries.
  - HTTP-only JWT session authentication with middleware protection.
- **Dual-Mode Data Resilience**: Connects to **Neon Serverless PostgreSQL** via **Drizzle ORM** when credentials are configured, with automatic seamless fallback to rich high-res specimen data for preview and local development.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router, Server & Client Components, Server Actions)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Neon](https://neon.tech/) Serverless PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit
- **Image CDN & Optimization**: [Cloudinary](https://cloudinary.com/) (WebP, AVIF, responsive transformations)
- **Authentication**: JWT HTTP-only cookies with middleware route security

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your credentials:

```env
# Neon Database Connection
DATABASE_URL="postgresql://username:password@ep-wildlife-123456.us-east-2.aws.neon.tech/cole_man?sslmode=require"

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Admin Dashboard
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="wildlife2026!"
ADMIN_JWT_SECRET="cole_man_secure_jwt_random_salt_984729"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Migration & Seeding (Neon)

When you're ready to push the schema to your Neon database:

```bash
# Push schema to Neon PostgreSQL
npm run db:push

# Seed the 8 official categories and initial records
npm run seed
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public website.

To access the administrator dashboard, visit [http://localhost:3000/admin](http://localhost:3000/admin) and log in with your configured admin credentials (default: `admin` / `wildlife2026!`).

---

## 📂 Project Structure

```
Cole_man/
├── src/
│   ├── app/
│   │   ├── admin/                # Secure Admin Dashboard & Auth
│   │   │   ├── login/
│   │   │   ├── photographs/      # Manage & Edit Photos
│   │   │   │   └── new/          # Signed Cloudinary Upload
│   │   │   ├── stories/          # Manage Journal Articles
│   │   │   └── messages/         # Review Inquiries
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── auth/         # JWT Session Handlers
│   │   │   │   ├── cloudinary-sign/ # Signed Direct Upload Token
│   │   │   │   └── photographs/  # CRUD with Cloudinary Sync
│   │   │   └── contact/          # Inquiries Submission
│   │   ├── gallery/              # Public Gallery & Lightbox
│   │   │   └── [slug]/           # Species Details
│   │   ├── stories/              # Field Journal Articles
│   │   │   └── [slug]/
│   │   ├── about/                # Biography & Gear Locker
│   │   ├── contact/              # Inquiries Form & Studio Info
│   │   ├── layout.tsx
│   │   └── page.tsx              # Home Page
│   ├── components/
│   │   ├── admin/                # Sidebar, PhotoUploader
│   │   ├── gallery/              # GalleryGrid, PhotographCard, LightboxModal
│   │   ├── home/                 # Hero, Featured, Categories, Instagram, CTA
│   │   └── layout/               # Header, Footer
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts         # Drizzle PostgreSQL Schema
│   │   │   ├── index.ts          # Neon Connection
│   │   │   └── data-store.ts     # Data Access Layer with Fallback
│   │   ├── auth.ts               # Admin Session & Credentials
│   │   ├── cloudinary.ts         # Cloudinary SDK & URL Optimizer
│   │   ├── mock-data.ts          # Curated High-Res Wildlife Data
│   │   └── types.ts              # Core TypeScript Interfaces
│   └── middleware.ts             # Admin Route Protection
├── scripts/
│   └── seed.mjs                  # Neon DB Seeder
├── drizzle.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔐 Security & Architecture Rules

1. **API Secrets Kept Server-Side**: Cloudinary's `API_SECRET` is never transmitted to the browser. Upload signatures are calculated via `/api/admin/cloudinary-sign` so the client uploads directly to Cloudinary CDN securely.
2. **Coordinated Cloudinary Deletions**: Deleting a photograph through the admin panel automatically issues an invalidation request to Cloudinary to destroy the remote asset, preventing orphaned files.
3. **Protected Admin Routes**: All `/admin/*` routes are protected via Next.js Middleware and verify cryptographic JWT session cookies.

---

## 📄 License

All photographs and creative content © Cole_man. All rights reserved.

