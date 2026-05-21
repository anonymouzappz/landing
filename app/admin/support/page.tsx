import { adminDb } from "@/src/lib/firebase-admin";
import { Bell, Mail, MessageCircle } from "lucide-react";

type SupportTicket = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
};

export default async function AdminSupportPage() {
  const snap = await adminDb
    .collection("supportTickets")
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();

  const tickets: SupportTicket[] = snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: typeof data.name === "string" ? data.name : "User",
      email: typeof data.email === "string" ? data.email : "",
      subject: typeof data.subject === "string" ? data.subject : "Support Request",
      message: typeof data.message === "string" ? data.message : "",
      status: typeof data.status === "string" ? data.status : "open",
    };
  });

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          Support
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">
          Support Center
        </h1>
        <p className="mt-3 text-white/55">
          View support messages, bug reports, and customer requests.
        </p>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/10">
                <Bell className="text-orange-300" size={23} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">{ticket.subject}</h2>
                  <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-xs font-black text-orange-300">
                    {ticket.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-4 text-sm font-semibold text-white/45">
                  <span className="flex items-center gap-2">
                    <MessageCircle size={15} />
                    {ticket.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail size={15} />
                    {ticket.email || "No email"}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-white/55">{ticket.message}</p>
              </div>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center text-white/50">
            No support tickets yet.
          </div>
        )}
      </div>
    </div>
  );
}