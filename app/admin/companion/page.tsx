export const dynamic = "force-dynamic";

import { adminDb } from "@/src/lib/firebase-admin";
import { Download, MonitorDown } from "lucide-react";

type CompanionRelease = {
  id: string;
  version: string;
  downloadUrl: string;
  notes: string;
  isActive: boolean;
};

export default async function AdminCompanionPage() {
  const snap = await adminDb
    .collection("companionReleases")
    .orderBy("createdAt", "desc")
    .limit(25)
    .get();

  const releases: CompanionRelease[] = snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      version: typeof data.version === "string" ? data.version : "1.0.0",
      downloadUrl: typeof data.downloadUrl === "string" ? data.downloadUrl : "",
      notes: typeof data.notes === "string" ? data.notes : "",
      isActive: data.isActive === true,
    };
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Companion
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Windows Companion Releases
          </h1>
          <p className="mt-3 text-white/55">
            Manage installer versions, release notes, and download links.
          </p>
        </div>

        <button className="rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-500 px-5 py-3 text-sm font-black text-black">
          New Release
        </button>
      </div>

      <div className="grid gap-4">
        {releases.map((release) => (
          <div
            key={release.id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <MonitorDown className="text-cyan-300" size={23} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">Version {release.version}</h2>
                  <span
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-black",
                      release.isActive
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-white/40",
                    ].join(" ")}
                  >
                    {release.isActive ? "LIVE" : "ARCHIVED"}
                  </span>
                </div>

                <p className="mt-3 leading-7 text-white/55">
                  {release.notes || "No release notes."}
                </p>

                {release.downloadUrl && (
                  <a
                    href={release.downloadUrl}
                    target="_blank"
                    className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-300"
                  >
                    <Download size={16} />
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {releases.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center text-white/50">
            No companion releases yet.
          </div>
        )}
      </div>
    </div>
  );
}