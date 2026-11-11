import Link from "next/link";
import { Instagram, Mail, ArrowUpRight, Camera, Globe, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101010] border-t border-[#222222] text-[#A0A0A0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.2em] text-[#F5F5F0]">
                COLE_MAN
              </span>
            </Link>
            <p className="text-sm italic text-[#84936A] font-serif">
              &ldquo;Capturing the Extraordinary in the Ordinary.&rdquo;
            </p>
            <p className="text-sm text-[#888888] max-w-md leading-relaxed">
              Dedicated to documenting the delicate wonders of entomology, macro arachnids,
              avian life, and untouched biomes. Revealing the miniature worlds thriving right beneath our feet.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1C1C1C] hover:bg-[#84936A] hover:text-[#121212] flex items-center justify-center transition-all duration-200 text-[#F5F5F0]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="w-9 h-9 rounded-full bg-[#1C1C1C] hover:bg-[#84936A] hover:text-[#121212] flex items-center justify-center transition-all duration-200 text-[#F5F5F0]"
                aria-label="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1C1C1C] hover:bg-[#84936A] hover:text-[#121212] flex items-center justify-center transition-all duration-200 text-[#F5F5F0]"
                aria-label="Portfolio"
              >
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F5F5F0] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/gallery" className="hover:text-[#F5F5F0] transition flex items-center justify-between group">
                  <span>Photo Gallery</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=insects" className="hover:text-[#F5F5F0] transition flex items-center justify-between group">
                  <span>Insects & Arthropods</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=spiders-and-arachnids" className="hover:text-[#F5F5F0] transition flex items-center justify-between group">
                  <span>Spiders & Arachnids</span>
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#F5F5F0] transition flex items-center justify-between group">
                  <span>Field Journal & Stories</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F5F5F0] transition flex items-center justify-between group">
                  <span>About Photographer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Inquiries & Connect */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F5F5F0] font-semibold">
              Inquiries
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed">
              Available for print acquisitions, editorial assignments, species documentation, and conservation licensing.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center text-xs uppercase tracking-widest text-[#84936A] hover:text-[#A2B384] font-medium group"
              >
                <span>Initiate collaboration</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
            <div className="pt-4 text-xs text-[#666666]">
              <p>Studio: Portland / Pacific Northwest</p>
              <p className="mt-1">Global field commissions accepted</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
          <p>© {currentYear} Cole_man. All photographs and rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>High-magnification Macro & Wildlife</span>
            <span className="text-[#333333]">|</span>
            <Link href="/admin/login" className="hover:text-[#888888] transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

