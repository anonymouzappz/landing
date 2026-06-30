import { BookOpen, Film, RefreshCw } from "lucide-react";

import { adminDb } from "@/src/lib/firebase-admin";
import HelpCenterVideoForm from "./HelpCenterVideoForm";

type HelpArticle = {
  id: string;
  title: string;
  category: string;
  summary: string;
  isActive: boolean;
  sortOrder: number;
  videoUrl: string;
  updatedAt: string;
};

export const dynamic = "force-dynamic";

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readNumber(value: unknown) {
  return typeof value === "number" ? value : 999;
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object") return "";

  const timestamp = value as { toDate?: () => Date };
  if (typeof timestamp.toDate !== "function") return "";

  return timestamp.toDate().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function getArticles() {
  const snap = await adminDb
    .collection("helpArticles")
    .orderBy("sortOrder", "asc")
    .limit(150)
    .get();

  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: readString(data.title) || "Untitled",
      category: readString(data.category) || "General",
      summary: readString(data.summary),
      isActive: data.isActive === true,
      sortOrder: readNumber(data.sortOrder),
      videoUrl: readString(data.videoUrl),
      updatedAt: formatDate(data.updatedAt),
    } satisfies HelpArticle;
  });
}

export default async function AdminHelpCenterPage() {
  const articles = await getArticles();
  const active = articles.filter((article) => article.isActive).length;
  const videos = articles.filter((article) => article.videoUrl).length;

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              <BookOpen size={14} />
              RemoteForge Admin
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Help Center
            </h1>

            <p className="mt-3 max-w-2xl text-white/55">
              Manage in-app help articles and upload support videos for setup,
              pairing, casting, and premium features.
            </p>
          </div>

          <a
            href="/admin/help-center"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
          >
            <RefreshCw size={17} />
            Refresh
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat label="Articles" value={articles.length} />
          <Stat label="Active" value={active} />
          <Stat label="Videos" value={videos} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(25rem,34rem)]">
          <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/25">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-xl font-black">Current Articles</h2>
              <p className="mt-1 text-sm font-semibold text-white/45">
                Showing latest {articles.length} articles from Firestore.
              </p>
            </div>

            <div className="grid gap-3 p-5">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-200">
                          {article.category}
                        </span>
                        <span
                          className={[
                            "rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider",
                            article.isActive
                              ? "bg-emerald-300/10 text-emerald-200"
                              : "bg-white/10 text-white/40",
                          ].join(" ")}
                        >
                          {article.isActive ? "Active" : "Hidden"}
                        </span>
                        {article.videoUrl ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-200">
                            <Film size={13} /> Video
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-3 truncate text-lg font-black">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white/55">
                        {article.summary || "No summary"}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs font-black text-white/30">
                      #{article.sortOrder}
                    </p>
                  </div>

                  <p className="mt-3 text-xs font-bold text-white/30">
                    {article.updatedAt || article.id}
                  </p>
                </article>
              ))}

              {!articles.length ? (
                <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-10 text-center text-white/45">
                  No help articles found yet.
                </div>
              ) : null}
            </div>
          </section>

          <HelpCenterVideoForm />
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/25">
      <p className="text-sm font-bold text-white/45">{label}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
}
