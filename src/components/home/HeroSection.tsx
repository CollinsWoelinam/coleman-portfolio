"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Compass, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=2400&q=90"
          alt="Regal Jumping Spider Macro Portrait"
          fill
          priority
          className="object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
          sizes="100vw"
        />
        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-[#121212]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#121212]/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 py-20">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818]/80 border border-[#84936A]/40 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#84936A]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F5F5F0]">
            Wildlife, Arthropod & Macro Photography
          </span>
        </div>

        {/* Brand & Main Headline */}
        <div className="space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-[0.15em] text-[#F5F5F0] drop-shadow-2xl">
            COLE_MAN
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#84936A] tracking-wide">
            &ldquo;Capturing the Extraordinary in the Ordinary.&rdquo;
          </p>
        </div>

        {/* Short introduction */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#C0C0C0] leading-relaxed font-light">
          An artistic archive dedicated to the breathtaking microscopic structures of insects,
          curious arachnids, and elusive wilderness creatures. Unveiling the miniature architectures
          hidden within plain sight.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/gallery"
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-[0.25em] hover:bg-[#A2B384] transition-all duration-300 shadow-xl shadow-[#84936A]/20 flex items-center justify-center gap-2 group"
          >
            <span>Explore The Gallery</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </Link>

          <Link
            href="/stories"
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#1E1E1E]/80 backdrop-blur-sm text-[#F5F5F0] border border-[#333333] hover:border-[#84936A] font-medium text-xs uppercase tracking-[0.25em] hover:bg-[#282828] transition-all duration-300"
          >
            Field Journal
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-[#737373] animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll to discover</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </div>
    </section>
  );
}

