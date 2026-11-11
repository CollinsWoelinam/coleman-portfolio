import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  url: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    likes: 842,
    comments: 63,
    caption: "A 40-slice handheld stack of Phidippus regius at dawn. Notice the emerald iridescent chelicerae! #macrophotography #jumpingspider",
    url: "https://instagram.com",
  },
  {
    id: "ig-2",
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
    likes: 1205,
    comments: 94,
    caption: "Chrysis ignita resting in morning dew drops. Nature's finest emerald jewel. #cuckoowasp #insectphotography",
    url: "https://instagram.com",
  },
  {
    id: "ig-3",
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=800&q=80",
    likes: 914,
    comments: 48,
    caption: "Microscopic view of butterfly wing scales under polarized illumination. #macroart #butterflies",
    url: "https://instagram.com",
  },
  {
    id: "ig-4",
    imageUrl: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=800&q=80",
    likes: 1540,
    comments: 112,
    caption: "Nocturnal search in the rainforest canopy. Agalychnis callidryas peeking through. #treefrog #herpetology",
    url: "https://instagram.com",
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-[#141414] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#84936A] uppercase tracking-[0.25em]">
              <Instagram className="w-3.5 h-3.5" />
              <span>Social Dispatches</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0]">
              From the Instagram Feed
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5F5F0] hover:text-[#84936A] font-medium transition group"
          >
            <span>Follow @cole_man</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4-post grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-[#1A1A1A] border border-[#262626]"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay with likes / comments */}
              <div className="absolute inset-0 bg-[#121212]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-[#F5F5F0]">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#84936A]" />
                </div>

                <p className="text-[11px] text-[#DDDDDD] line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-[#A0A0A0]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

