import { Crown, MonitorSmartphone, Users, Wifi } from "lucide-react";
import { adminDb } from "@/src/lib/firebase-admin";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default async function AdminDashboardPage() {
  const usersSnap = await adminDb.collection("users").get();

  const users = usersSnap.docs.map((doc) => doc.data());
  const premiumUsers = users.filter((user) => user.isPremium === true).length;

  let deviceCount = 0;

  for (const doc of usersSnap.docs) {
    const devices = await adminDb
      .collection("users")
      .doc(doc.id)
      .collection("devices")
      .get();

    deviceCount += devices.size;
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          RemoteForge Admin
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">
          Command Center
        </h1>
        <p className="mt-3 max-w-2xl text-white/55">
          Manage users, devices, premium access, companion downloads, and app
          operations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard title="Total Users" value={users.length} icon={Users} />
        <AdminStatCard title="Premium Users" value={premiumUsers} icon={Crown} accent="text-fuchsia-300" />
        <AdminStatCard title="Saved Devices" value={deviceCount} icon={MonitorSmartphone} />
        <AdminStatCard title="System Status" value="Online" icon={Wifi} accent="text-emerald-300" />
      </div>
    </div>
  );
}