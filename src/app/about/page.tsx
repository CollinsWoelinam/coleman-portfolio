import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Layers,
  Sparkles,
  ShieldCheck,
  Instagram,
  Mail,
  HeartHandshake,
  Cpu,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About the Photographer — Cole_man",
  description:
    "Learn about Cole_man's decade-long journey documenting microscopic insects, arachnids, and elusive wildlife through high-magnification macro photography.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Header Hero */}
        <div className="space-y-4 border-b border-[#242424] pb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            Biography & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F0]">
            Cole_man Photography
          </h1>
          <p className="font-serif italic text-xl text-[#84936A]">
            &ldquo;Capturing the Extraordinary in the Ordinary.&rdquo;
          </p>
        </div>

        {/* Profile & Journey Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#2E2E2E] bg-[#1E1E1E]">
              <Image
                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1200&q=85"
                alt="Cole_man photographing in the wilderness"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="p-5 rounded-sm bg-[#181818] border border-[#282828] space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F5F0]">
                Quick Contact & Connect
              </h4>
              <p className="text-xs text-[#888888]">
                Based in the Pacific Northwest, traveling globally for species surveys and biodiversity initiatives.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#84936A] hover:underline"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@cole_man</span>
                </a>
                <span className="text-[#333333]">|</span>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 text-xs text-[#F5F5F0] hover:text-[#84936A]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 text-[#CCCCCC] font-light leading-relaxed text-sm sm:text-base">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0]">
              The Journey Into The Microscopic
            </h2>

            <p>
              My passion for wildlife photography didn’t start on African savannahs or arctic glaciers—it
              began on hands and knees in my childhood backyard, staring through morning dew into the iridescent
              cuticle of a tiny ground beetle.
            </p>

            <p>
              While telephoto wildlife photography celebrates the grandeur of apex predators, macro photography
              is an act of profound discovery. When you magnify an insect or jumping spider two to five times life size,
              you realize that alien worlds don&apos;t exist light-years away in space. They are thriving beneath the leaf litter,
              along forest trails, and inside peeling tree bark.
            </p>

            <p>
              Every compound eye is a masterclass in optical geometry. Every butterfly scale is a photonic crystal.
              Through deliberate, high-resolution focus-stacking, my goal is to give these vital organisms the same
              dignity, artistry, and monumental respect usually reserved for tigers and eagles.
            </p>

            <div className="p-6 rounded-sm bg-[#1A1A1A] border-l-2 border-[#84936A] space-y-2 mt-6">
              <h3 className="font-serif text-lg text-[#F5F5F0]">Our Field Ethics</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                I adhere to a strict ethical standard: I never chill, tranquilize, or harm any specimen.
                Every photograph is captured in the subject&apos;s natural ambient habitat. Living creatures are treated
                with reverence, not as decorative props.
              </p>
            </div>
          </div>
        </div>

        {/* Gear Locker & Technical Breakdown */}
        <div className="space-y-8 pt-8 border-t border-[#242424]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
              The Gear Locker
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F5F0]">
              Equipment & Optics
            </h2>
            <p className="text-sm text-[#888888] max-w-2xl">
              Capturing sub-millimeter details requires specialized glass, precision motorized rails, and carefully diffused illumination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-4">
              <div className="w-10 h-10 rounded bg-[#222222] flex items-center justify-center text-[#84936A]">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#F5F5F0]">Camera Bodies</h3>
              <ul className="space-y-2 text-xs text-[#A0A0A0]">
                <li>• <strong>Sony A7R V:</strong> 61MP BSI sensor with in-body focus bracketing</li>
                <li>• <strong>Canon EOS R5:</strong> 45MP high-speed field body</li>
                <li>• <strong>Fujifilm GFX 100S:</strong> Medium format for large habitat biomes</li>
              </ul>
            </div>

            <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-4">
              <div className="w-10 h-10 rounded bg-[#222222] flex items-center justify-center text-[#84936A]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#F5F5F0]">Macro Optics</h3>
              <ul className="space-y-2 text-xs text-[#A0A0A0]">
                <li>• <strong>Laowa 25mm f/2.8:</strong> 2.5X – 5X Ultra Macro</li>
                <li>• <strong>Canon RF 100mm f/2.8L:</strong> 1.4X with SA control</li>
                <li>• <strong>Voigtländer 110mm f/2.5:</strong> Apochromatic 1:1</li>
                <li>• <strong>Sony FE 600mm f/4 GM:</strong> Avian & large wildlife</li>
              </ul>
            </div>

            <div className="p-6 rounded-sm bg-[#181818] border border-[#282828] space-y-4">
              <div className="w-10 h-10 rounded bg-[#222222] flex items-center justify-center text-[#84936A]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#F5F5F0]">Lighting & Rails</h3>
              <ul className="space-y-2 text-xs text-[#A0A0A0]">
                <li>• <strong>Custom AK Concave Diffusers:</strong> Soft light wraps</li>
                <li>• <strong>Godox V860III Dual Twins:</strong> High-speed sync fill</li>
                <li>• <strong>Cognisys StackShot:</strong> 1-micron motorized rail</li>
                <li>• <strong>Gitzo Mountaineer Tripod:</strong> Low-ground stability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-sm bg-[#161616] border border-[#282828] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl text-[#F5F5F0]">Interested in a Print or Commission?</h3>
            <p className="text-xs text-[#888888]">Inquire about gallery exhibitions, museum prints, or field workshops.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-widest hover:bg-[#A2B384] transition shrink-0"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

