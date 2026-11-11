import { getContactMessages } from "@/lib/db/data-store";
import MessagesManager from "./MessagesManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-8">
      <div className="border-b border-[#242424] pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#84936A] font-mono">
          Communications
        </span>
        <h1 className="font-serif text-3xl text-[#F5F5F0]">
          Inquiries & Messages Inbox
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          Review inquiries from collectors, publishers, and scientific collaborators.
        </p>
      </div>

      <MessagesManager initialMessages={messages} />
    </div>
  );
}

