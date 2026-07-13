export const dynamic = "force-dynamic";

import { Crown, MonitorSmartphone, Users, Wifi } from "lucide-react";
import { adminDb } from "@/src/lib/firebase-admin";
import AdminStatCard from "@/components/admin/AdminStatCard";

type AdminUser = {
  id: string;
  isPremium?: boolean;
};

export default async function AdminDashboardPage() {
  const usersSnap = await adminDb.collection("users").get();

  const users: AdminUser[] = usersSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<AdminUser, "id">),
  }));

  const premiumUsers = users.filter(
    (user) => user.isPremium === true,
  ).length;

  const deviceSnaps = await Promise.all(
    usersSnap.docs.map((doc) =>
      adminDb.collection("users").doc(doc.id).collection("devices").get(),
    ),
  );

  const deviceCount = deviceSnaps.reduce(
    (total, snap) => total + snap.size,
    0,
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-6 sm:mb-8">
        <p className="break-words text-xs font-black uppercase tracking-[0.22em] text-cyan-300 sm:text-sm sm:tracking-[0.35em]">
          RemoteForge Admin
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Command Center
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
          Manage users, devices, premium access, companion downloads, and app
          operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        <AdminStatCard title="Total Users" value={users.length} icon={Users} />

        <AdminStatCard
          title="Premium Users"
          value={premiumUsers}
          icon={Crown}
          accent="text-fuchsia-300"
        />

        <AdminStatCard
          title="Saved Devices"
          value={deviceCount}
          icon={MonitorSmartphone}
        />

        <AdminStatCard
          title="System Status"
          value="Online"
          icon={Wifi}
          accent="text-emerald-300"
        />
      </div>
    </div>
  );
}