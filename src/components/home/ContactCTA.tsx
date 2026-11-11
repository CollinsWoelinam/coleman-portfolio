import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-24 bg-[#111111] relative overflow-hidden border-t border-[#1F1F1F]">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#1E1E1E] border border-[#84936A]/40 flex items-center justify-center text-[#84936A]">
          <Mail className="w-5 h-5" />
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0]">
            Connect for Collaborations & Inquiries
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl mx-auto leading-relaxed">
            Interested in fine art archival prints, editorial publication licensing,
            or commissioning specialized macro species documentation?
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-[#84936A] text-[#121212] font-semibold text-xs uppercase tracking-[0.25em] hover:bg-[#A2B384] transition-all shadow-xl shadow-[#84936A]/10 group"
          >
            <span>Send a Message</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

