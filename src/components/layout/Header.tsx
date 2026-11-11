"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Shield, Camera } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Stories", href: "/stories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isAdminRoute) {
    return (
      <header className="sticky top-0 z-50 bg-[#181818] border-b border-[#2E2E2E] px-6 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-serif tracking-widest text-lg font-bold text-[#F5F5F0]">
            COLE_MAN <span className="text-xs font-sans text-[#84936A] uppercase tracking-wider ml-1">Admin Portal</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#A0A0A0]">
          <Link href="/" className="hover:text-[#F5F5F0] transition flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            View Public Site
          </Link>
          <form action="/api/admin/auth" method="POST">
            <input type="hidden" name="action" value="logout" />
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-[#282828] text-rose-300 hover:bg-rose-950/30 hover:border-rose-800 border border-transparent transition"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#121212]/90 backdrop-blur-md py-4 border-b border-[#2E2E2E]/60 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl font-normal tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#84936A] transition-colors duration-200">
            COLE_MAN
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#84936A] uppercase font-mono">
            Wildlife & Nature
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-all duration-200 relative py-1 ${
                  isActive
                    ? "text-[#F5F5F0] font-medium"
                    : "text-[#A0A0A0] hover:text-[#F5F5F0]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#84936A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            href="/gallery"
            className="text-xs uppercase tracking-[0.2em] px-4 py-2 rounded border border-[#84936A]/60 text-[#F5F5F0] hover:bg-[#84936A] hover:text-[#121212] transition-all duration-300 font-medium"
          >
            Explore Gallery
          </Link>
          <Link
            href="/admin"
            title="Admin Dashboard"
            className="text-[#737373] hover:text-[#84936A] transition p-1.5"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-[#F5F5F0] p-2 hover:text-[#84936A] transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181818] border-b border-[#2E2E2E] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base uppercase tracking-widest py-2 border-b border-[#2E2E2E]/40 ${
                    isActive ? "text-[#84936A] font-semibold" : "text-[#A0A0A0]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/gallery"
                className="text-xs uppercase tracking-widest text-center px-4 py-2.5 rounded bg-[#84936A] text-[#121212] font-semibold w-full"
              >
                View Full Gallery
              </Link>
            </div>
            <div className="pt-2 flex justify-end">
              <Link
                href="/admin"
                className="text-xs text-[#737373] hover:text-[#84936A] flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Photographer Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

