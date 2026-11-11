import HeroSection from "@/components/home/HeroSection";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import AboutPreview from "@/components/home/AboutPreview";
import InstagramFeed from "@/components/home/InstagramFeed";
import ContactCTA from "@/components/home/ContactCTA";
import { getPhotographs, getCategories } from "@/lib/db/data-store";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [featuredPhotos, categories] = await Promise.all([
    getPhotographs({ featuredOnly: true, publishedOnly: true }),
    getCategories(),
  ]);

  return (
    <div className="w-full">
      {/* 4.1 Hero Section */}
      <HeroSection />

      {/* Featured photographs */}
      <FeaturedGallery photographs={featuredPhotos} />

      {/* Photography categories */}
      <CategoryShowcase categories={categories} />

      {/* Short About section */}
      <AboutPreview />

      {/* Latest Instagram photos */}
      <InstagramFeed />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}

