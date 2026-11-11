"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#161616] border border-[#262626] rounded-sm p-8 space-y-8 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#202020] border border-[#84936A]/40 flex items-center justify-center text-[#84936A]">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl text-[#F5F5F0]">Cole_man Admin</h1>
        <p className="text-xs text-[#888888]">
          Restricted access for portfolio content management.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#A0A0A0]">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-[#1C1C1C] border border-[#2C2C2C] focus:border-[#84936A] focus:outline-none rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#F5F5F0] transition"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#A0A0A0]">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1C1C1C] border border-[#2C2C2C] focus:border-[#84936A] focus:outline-none rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#F5F5F0] transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-sm bg-[#84936A] hover:bg-[#A2B384] text-[#121212] font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Credentials Note for local/dev use */}
      <div className="p-4 rounded bg-[#121212] border border-[#222222] text-[11px] text-[#777777] space-y-1">
        <p className="font-mono text-[#84936A]">Default Administrator Credentials:</p>
        <p>Username: <code className="text-[#AAAAAA]">admin</code></p>
        <p>Password: <code className="text-[#AAAAAA]">wildlife2026!</code></p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <Suspense fallback={<div className="text-xs font-mono text-[#737373]">Loading authentication form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
