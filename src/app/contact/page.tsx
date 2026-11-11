import { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, Instagram, MapPin, Clock, ShieldCheck, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Inquiries — Cole_man",
  description:
    "Get in touch with Cole_man for print inquiries, commercial species licensing, editorial features, or private photography commissions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#242424] pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F0]">
            Inquiries & Collaborations
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Whether inquiring about signed fine art archival prints, licensing imagery for educational
            publications, or discussing a conservation assignment, I welcome your message.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Studio Details & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-sm bg-[#181818] border border-[#282828] space-y-6">
              <h3 className="font-serif text-xl text-[#F5F5F0] border-b border-[#262626] pb-3">
                Studio Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#84936A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono uppercase text-[#737373] text-[10px] block">Direct Email</span>
                    <a href="mailto:inquiries@coleman-photography.com" className="text-[#F5F5F0] hover:text-[#84936A] transition">
                      inquiries@coleman-photography.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#84936A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono uppercase text-[#737373] text-[10px] block">Location</span>
                    <p className="text-[#F5F5F0]">Portland, Oregon, USA</p>
                    <p className="text-[11px] text-[#737373]">Available for worldwide field assignments</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#84936A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono uppercase text-[#737373] text-[10px] block">Turnaround</span>
                    <p className="text-[#F5F5F0]">24–48 hours for general inquiries</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#262626] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block">
                  Follow Field Updates
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded bg-[#202020] hover:bg-[#84936A] hover:text-[#121212] transition text-xs text-[#F5F5F0]"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded bg-[#202020] hover:bg-[#84936A] hover:text-[#121212] transition text-xs text-[#F5F5F0]"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Archive</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Print Note */}
            <div className="p-6 rounded-sm bg-[#151515] border border-[#222222] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#84936A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Museum-Grade Archival Quality</span>
              </div>
              <p className="text-xs text-[#888888] leading-relaxed">
                All physical prints are custom produced on 100% cotton rag Hahnemühle Photo Rag 308gsm with pigment-based archival inks rated for 100+ years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

