export const dynamic = "force-dynamic";

import {
  Bug,
  CheckCircle2,
  Clock3,
  Lightbulb,
  LifeBuoy,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { adminDb } from "@/src/lib/firebase-admin";

type FeedbackItem = {
  id: string;
  type: string;
  status: string;
  name: string;
  email: string;
  message: string;
  pageUrl: string;
  source: string;
  createdAt: string;
  updatedAt: string;
};

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object") return "";

  const timestamp = value as {
    toDate?: () => Date;
  };

  if (typeof timestamp.toDate !== "function") return "";

  return timestamp.toDate().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function getFeedback() {
  const snap = await adminDb
    .collection("supportFeedback")
    .orderBy("createdAt", "desc")
    .limit(250)
    .get();

  const items: FeedbackItem[] = snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      type: readString(data.type) || "feedback",
      status: readString(data.status) || "new",
      name: readString(data.name),
      email: readString(data.email),
      message: readString(data.message),
      pageUrl: readString(data.pageUrl),
      source: readString(data.source),
      createdAt: formatDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
    };
  });

  return items;
}

export default async function AdminSupportPage() {
  const items = await getFeedback();

  const total = items.length;
  const newest = items.filter((item) => item.status === "new").length;
  const bugs = items.filter((item) => item.type === "bug").length;
  const features = items.filter((item) => item.type === "feature").length;

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              <LifeBuoy size={14} />
              RemoteForge Admin
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Support & Feedback
            </h1>

            <p className="mt-3 max-w-2xl text-white/55">
              View support requests, bugs, feature ideas, and feedback sent from
              the website FAB.
            </p>
          </div>

          <a
            href="/admin/support"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
          >
            <RefreshCw size={17} />
            Refresh
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={MessageSquare} label="Total" value={total} />
          <StatCard icon={Clock3} label="New" value={newest} />
          <StatCard icon={Bug} label="Bugs" value={bugs} />
          <StatCard icon={Lightbulb} label="Features" value={features} />
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-xl font-black">Latest Messages</h2>
            <p className="mt-1 text-sm font-semibold text-white/45">
              Showing latest {items.length} support and feedback messages.
            </p>
          </div>

          <div className="grid gap-4 p-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge type={item.type} />
                      <StatusBadge status={item.status} />
                    </div>

                    <h3 className="mt-4 text-lg font-black">
                      {item.name || "Anonymous"}
                    </h3>

                    {item.email ? (
                      <a
                        href={`mailto:${item.email}`}
                        className="mt-1 block text-sm font-bold text-cyan-300 hover:text-cyan-200"
                      >
                        {item.email}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-bold text-white/35">
                        No email provided
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white/35">
                    {item.createdAt || "No date"}
                  </p>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm font-semibold leading-7 text-white/70">
                  {item.message}
                </p>

                {item.pageUrl ? (
                  <a
                    href={item.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block truncate text-xs font-bold text-white/35 hover:text-cyan-300"
                  >
                    {item.pageUrl}
                  </a>
                ) : null}
              </article>
            ))}

            {!items.length ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-12 text-center text-white/45">
                No support or feedback messages yet.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-white/45">{label}</p>
          <p className="mt-2 text-4xl font-black">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <Icon size={22} className="text-cyan-300" />
        </div>
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-200">
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const resolved = status === "resolved";

  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider",
        resolved
          ? "bg-emerald-400/10 text-emerald-300"
          : "bg-amber-400/10 text-amber-300",
      ].join(" ")}
    >
      {resolved ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
      {status}
    </span>
  );
}