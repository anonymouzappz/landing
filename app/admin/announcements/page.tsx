import { adminDb } from "@/src/lib/firebase-admin";
import { Megaphone } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  audience: string;
};

export default async function AdminAnnouncementsPage() {
  const snap = await adminDb
    .collection("announcements")
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  const announcements: Announcement[] = snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: typeof data.title === "string" ? data.title : "Untitled",
      message: typeof data.message === "string" ? data.message : "",
      isActive: data.isActive === true,
      audience: typeof data.audience === "string" ? data.audience : "all",
    };
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Announcements
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            App Announcements
          </h1>
          <p className="mt-3 text-white/55">
            Manage messages shown inside RemoteForge.
          </p>
        </div>

        <button className="rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-500 px-5 py-3 text-sm font-black text-black">
          Create Announcement
        </button>
      </div>

      <div className="grid gap-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <Megaphone className="text-cyan-300" size={23} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">{item.title}</h2>
                  <span
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-black",
                      item.isActive
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-white/40",
                    ].join(" ")}
                  >
                    {item.isActive ? "ACTIVE" : "DRAFT"}
                  </span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-300">
                    {item.audience}
                  </span>
                </div>

                <p className="mt-3 leading-7 text-white/55">{item.message}</p>
              </div>
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center text-white/50">
            No announcements created yet.
          </div>
        )}
      </div>
    </div>
  );
}