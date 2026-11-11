"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";
  const speciesParam = searchParams.get("species") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjectParam || "",
    message: speciesParam
      ? `Hello Cole,\n\nI am interested in licensing or acquiring an archival fine art print of the "${speciesParam}" photograph. Please share details regarding available sizing, paper finishes, and pricing.\n\nThank you,`
      : "",
  });

  useEffect(() => {
    if (subjectParam && !formData.subject) {
      setFormData((prev) => ({ ...prev, subject: subjectParam }));
    }
    if (speciesParam && !formData.message) {
      setFormData((prev) => ({
        ...prev,
        message: `Hello Cole,\n\nI am interested in licensing or acquiring an archival fine art print of the "${speciesParam}" photograph. Please share details regarding available sizing, paper finishes, and pricing.\n\nThank you,`,
      }));
    }
  }, [subjectParam, speciesParam, formData.subject, formData.message]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-sm bg-[#181818] border border-[#84936A]/50 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-[#84936A] mx-auto" />
        <h3 className="font-serif text-2xl text-[#F5F5F0]">Message Delivered</h3>
        <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Cole_man Photography. Your inquiry has been received and you will receive a response within 24 to 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs uppercase tracking-widest text-[#84936A] hover:underline pt-2 inline-block font-mono"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#161616] p-8 rounded-sm border border-[#262626]">
      {status === "error" && (
        <div className="p-4 rounded-sm bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Dr. Jane Goodall"
            className="w-full bg-[#1E1E1E] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-3 text-xs text-[#F5F5F0] placeholder-[#555555] transition"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@conservation.org"
            className="w-full bg-[#1E1E1E] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-3 text-xs text-[#F5F5F0] placeholder-[#555555] transition"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
          Inquiry Subject *
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-[#1E1E1E] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-3 text-xs text-[#F5F5F0] transition"
        >
          <option value="" disabled>Select inquiry type...</option>
          <option value="Print Acquisition">Fine Art Print Acquisition</option>
          <option value="Licensing & Publication">Species Photo Licensing / Editorial</option>
          <option value="Field Commission">Field Assignment & Species Survey</option>
          <option value="Gallery Exhibition">Exhibition & Museum Display</option>
          <option value="General Question">General Inquiry / Feedback</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Please share details regarding your inquiry, preferred dimensions, publication context, or project timeframe..."
          className="w-full bg-[#1E1E1E] border border-[#2E2E2E] focus:border-[#84936A] focus:outline-none rounded-sm px-4 py-3 text-xs text-[#F5F5F0] placeholder-[#555555] transition leading-relaxed resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#84936A] hover:bg-[#A2B384] text-[#121212] font-semibold text-xs uppercase tracking-[0.25em] transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Dispatch Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-[#737373]">Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
