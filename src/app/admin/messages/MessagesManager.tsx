"use client";

import { useState } from "react";
import { ContactMessage } from "@/lib/types";
import { Mail, CheckCircle, Clock, User, MessageSquare } from "lucide-react";

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export default function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    initialMessages[0] || null
  );

  const handleMarkAsRead = async (msg: ContactMessage) => {
    if (msg.is_read) return;

    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id }),
      });

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
      );
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage((prev) => (prev ? { ...prev, is_read: true } : null));
      }
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      handleMarkAsRead(msg);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
      {/* Messages List */}
      <div className="lg:col-span-5 bg-[#181818] border border-[#282828] rounded-sm divide-y divide-[#242424] overflow-y-auto max-h-[70vh]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => handleSelect(msg)}
            className={`p-4 cursor-pointer transition flex items-start justify-between gap-3 ${
              selectedMessage?.id === msg.id
                ? "bg-[#222222] border-l-2 border-[#84936A]"
                : "hover:bg-[#1C1C1C]"
            }`}
          >
            <div className="space-y-1 truncate">
              <div className="flex items-center gap-2">
                {!msg.is_read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                )}
                <p className={`text-xs truncate ${!msg.is_read ? "font-semibold text-[#F5F5F0]" : "text-[#CCCCCC]"}`}>
                  {msg.name}
                </p>
              </div>
              <p className="text-xs font-medium text-[#F5F5F0] truncate">{msg.subject}</p>
              <p className="text-[11px] text-[#737373] truncate">{msg.message}</p>
            </div>

            <span className="text-[10px] font-mono text-[#666666] shrink-0">
              {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ""}
            </span>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-8 text-center text-xs text-[#737373]">
            No inquiries received yet.
          </div>
        )}
      </div>

      {/* Selected Message Reader */}
      <div className="lg:col-span-7 bg-[#181818] border border-[#282828] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
        {selectedMessage ? (
          <div className="space-y-6">
            <div className="border-b border-[#262626] pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#84936A]">
                  Inquiry Details
                </span>
                <span className="text-xs font-mono text-[#737373]">
                  {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString() : ""}
                </span>
              </div>
              <h2 className="font-serif text-2xl text-[#F5F5F0]">
                {selectedMessage.subject}
              </h2>
              <div className="text-xs text-[#A0A0A0] flex flex-wrap gap-4 pt-1">
                <span>From: <strong className="text-[#F5F5F0]">{selectedMessage.name}</strong></span>
                <span>Email: <a href={`mailto:${selectedMessage.email}`} className="text-[#84936A] hover:underline">{selectedMessage.email}</a></span>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-[#DDDDDD] leading-relaxed whitespace-pre-wrap font-light">
              {selectedMessage.message}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 text-xs text-[#737373]">
            Select an inquiry from the inbox to read.
          </div>
        )}

        {selectedMessage && (
          <div className="pt-6 border-t border-[#262626] flex items-center justify-between">
            <a
              href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
              className="px-6 py-2.5 rounded-sm bg-[#84936A] hover:bg-[#A2B384] text-[#121212] font-semibold text-xs uppercase tracking-wider transition"
            >
              Reply via Email
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

