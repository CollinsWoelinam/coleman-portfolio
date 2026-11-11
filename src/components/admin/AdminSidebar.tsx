"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  UploadCloud,
  BookOpen,
  Mail,
  ExternalLink,
  LogOut,
  Camera,
} from "lucide-react";

const ADMIN_NAV = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "All Photographs", href: "/admin/photographs", icon: Images },
  { name: "Upload Photograph", href: "/admin/photographs/new", icon: UploadCloud },
  { name: "Field Stories", href: "/admin/stories", icon: BookOpen },
  { name: "Inquiries Inbox", href: "/admin/messages", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#161616] border-r border-[#242424] min-h-[calc(100vh-53px)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#737373]">
            Management System
          </span>
          <h3 className="font-serif text-lg text-[#F5F5F0]">Cole_man Admin</h3>
        </div>

        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-medium transition ${
                  isActive
                    ? "bg-[#84936A] text-[#121212] font-semibold"
                    : "text-[#A0A0A0] hover:text-[#F5F5F0] hover:bg-[#1F1F1F]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 pt-6 border-t border-[#242424] text-xs">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded text-[#888888] hover:text-[#F5F5F0] hover:bg-[#1E1E1E] transition"
        >
          <Camera className="w-4 h-4" />
          <span>View Public Gallery</span>
        </Link>

        <form action="/api/admin/auth" method="POST">
          <input type="hidden" name="action" value="logout" />
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded text-rose-400 hover:bg-rose-950/20 transition text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

