export const dynamic = "force-dynamic";

import AdminAvatar from "@/components/admin/AdminAvatar";
import AdminUserToggle from "@/components/admin/AdminUserToggle";
import { adminDb } from "@/src/lib/firebase-admin";

type AdminUser = {
  id: string;
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  isPremium: boolean;
  adsDisabled: boolean;
  isAnonymous: boolean;
  authProvider: string;
  lastActiveAtMs: number;
};

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getBool(value: unknown) {
  return value === true;
}

function getTimestampMs(value: unknown) {
  if (!value) return 0;

  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof value.toMillis === "function"
  ) {
    return value.toMillis();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  return 0;
}
function formatLastActive(ms: number) {
  if (!ms) return "Never active";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(ms));
}

export default async function AdminUsersPage() {
  const snap = await adminDb.collection("users").get();

  const users: AdminUser[] = snap.docs
    .map((doc) => {
      const data = doc.data();

      const uid = getString(data.uid, doc.id);
      const name =
        getString(data.name) ||
        getString(data.displayName) ||
        "RemoteForge User";

      const photoUrl =
        getString(data.photoUrl) ||
        getString(data.photoURL) ||
        "";

      const lastActiveAtMs = getTimestampMs(data.lastActiveAt);

      return {
        id: doc.id,
        uid,
        name,
        email: getString(data.email),
        photoUrl,
        isPremium: getBool(data.isPremium),
        adsDisabled: getBool(data.adsDisabled),
        isAnonymous: getBool(data.isAnonymous),
        authProvider:
          getString(data.authProvider) ||
          getString(data.provider) ||
          "unknown",
        lastActiveAtMs,
      };
    })
    .sort((a, b) => {
      return b.lastActiveAtMs - a.lastActiveAtMs;
    });

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          Users
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight">
          User Management
        </h1>

        <p className="mt-3 text-white/55">
          View RemoteForge accounts, turn Premium on/off, disable ads, and
          manage account access.
        </p>

        <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/60">
          {users.length} total user{users.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="hidden grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_1fr] border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-wider text-white/40 lg:grid">
          <span>User</span>
          <span>Premium</span>
          <span>Ads</span>
          <span>Last Active</span>
          <span>UID</span>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="grid gap-4 border-b border-white/5 px-5 py-5 last:border-b-0 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_1fr] lg:items-center"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <AdminAvatar
                  src={user.photoUrl}
                  alt={user.name || "RemoteForge User"}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-black">
                  {user.name || "RemoteForge User"}
                </p>

                <p className="truncate text-sm text-white/45">
                  {user.email || "No email"}
                </p>

                <p className="mt-1 text-xs font-bold text-white/30">
                  {user.authProvider}
                  {user.isAnonymous ? " • Guest" : ""}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-wider text-white/30 lg:hidden">
                Premium
              </p>

              <AdminUserToggle
                uid={user.uid || user.id}
                field="isPremium"
                initialValue={user.isPremium}
                label="Premium"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-wider text-white/30 lg:hidden">
                Ads
              </p>

              <AdminUserToggle
                uid={user.uid || user.id}
                field="adsDisabled"
                initialValue={user.adsDisabled}
                label="Ads Disabled"
              />
            </div>

            <div>
              <p className="mb-1 text-xs font-black uppercase tracking-wider text-white/30 lg:hidden">
                Last Active
              </p>

              <p className="text-xs font-bold text-white/40">
                {formatLastActive(user.lastActiveAtMs)}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-black uppercase tracking-wider text-white/30 lg:hidden">
                UID
              </p>

              <p className="break-all text-xs font-bold text-white/35">
                {user.uid || user.id}
              </p>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="p-8 text-center text-white/45">No users found.</div>
        )}
      </div>
    </div>
  );
}