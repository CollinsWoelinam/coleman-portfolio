import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, ShieldCheck, Aperture } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photographer portrait / field image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#2E2E2E] bg-[#1E1E1E]">
              <Image
                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1200&q=85"
                alt="Cole_man in the field with macro camera gear"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[#1C1C1C]/95 border border-[#84936A]/40 p-4 rounded-sm backdrop-blur-md shadow-2xl">
              <Aperture className="w-8 h-8 text-[#84936A]" />
              <div className="text-left">
                <p className="text-xs font-mono uppercase tracking-widest text-[#F5F5F0]">12+ Years</p>
                <p className="text-[10px] text-[#A0A0A0]">Field Macro & Wildlife</p>
              </div>
            </div>
          </div>

          {/* About text narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
                The Photographer
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0]">
                Behind The Lens
              </h2>
            </div>

            <p className="text-base text-[#D0D0D0] font-light leading-relaxed">
              Hello, I&apos;m Cole. What began over a decade ago as a quiet curiosity with a reversed 50mm lens
              has evolved into a lifelong quest to photograph the creatures that dwell just beneath human perception.
            </p>

            <p className="text-sm text-[#999999] leading-relaxed">
              Most people walk through a woodland seeing trees and trails. I search the undersides of damp birch leaves,
              the morning-cold moss crevices, and the dry stone walls where jumping spiders and jeweled cuckoo wasps
              conduct complex lives. Through extreme focus-stacking and respectful field ethics, my mission is to reveal
              their astonishing geometry and evolutionary brilliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#262626]">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-[#84936A] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-[#F5F5F0]">Extreme Magnification</h4>
                  <p className="text-xs text-[#888888] mt-0.5">Pushing 1:1 up to 5:1 life-size reproduction in the wild.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#84936A] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-[#F5F5F0]">Strict Field Ethics</h4>
                  <p className="text-xs text-[#888888] mt-0.5">Zero chilling, zero harm, always preserving natural behavior.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded-sm bg-[#1E1E1E] border border-[#333333] hover:border-[#84936A] text-[#F5F5F0] hover:text-[#84936A] transition-all font-medium group"
              >
                <span>Read Full Biography & Gear Philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

