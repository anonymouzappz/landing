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
};

export default async function AdminUsersPage() {
  const snap = await adminDb
    .collection("users")
    .orderBy("lastActiveAt", "desc")
    .limit(100)
    .get();

  const users: AdminUser[] = snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      uid: typeof data.uid === "string" ? data.uid : doc.id,
      name: typeof data.name === "string" ? data.name : "RemoteForge User",
      email: typeof data.email === "string" ? data.email : "",
      photoUrl: typeof data.photoUrl === "string" ? data.photoUrl : "",
      isPremium: data.isPremium === true,
      adsDisabled: data.adsDisabled === true,
      isAnonymous: data.isAnonymous === true,
      authProvider:
        typeof data.authProvider === "string" ? data.authProvider : "unknown",
    };
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
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-wider text-white/40">
          <span>User</span>
          <span>Premium</span>
          <span>Ads</span>
          <span>UID</span>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 border-b border-white/5 px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10">
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

            <AdminUserToggle
              uid={user.uid || user.id}
              field="isPremium"
              initialValue={user.isPremium}
              label="Premium"
            />

            <AdminUserToggle
              uid={user.uid || user.id}
              field="adsDisabled"
              initialValue={user.adsDisabled}
              label="Ads Disabled"
            />

            <p className="truncate text-xs font-bold text-white/35">
              {user.uid || user.id}
            </p>
          </div>
        ))}

        {users.length === 0 && (
          <div className="p-8 text-center text-white/45">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}