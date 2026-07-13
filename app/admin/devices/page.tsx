export const dynamic = "force-dynamic";

import { adminDb } from "@/src/lib/firebase-admin";
import { Tv, Laptop, Router } from "lucide-react";

type AdminDevice = {
  id: string;
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
  name: string;
  type: string;
  brand: string;
  platform: string;
  ipAddress: string;
  port: number;
  roomName?: string;
};

function deviceIcon(type: string) {
  if (type === "windows_pc") return Laptop;
  if (type === "roku_tv" || type === "android_tv" || type === "fire_tv") return Tv;
  return Router;
}

export default async function AdminDevicesPage() {
  const usersSnap = await adminDb.collection("users").get();

  const devices: AdminDevice[] = [];

  for (const userDoc of usersSnap.docs) {
    const user = userDoc.data();

    const devicesSnap = await adminDb
      .collection("users")
      .doc(userDoc.id)
      .collection("devices")
      .get();

    devicesSnap.docs.forEach((deviceDoc) => {
      const data = deviceDoc.data();

      devices.push({
        id: deviceDoc.id,
        ownerId: userDoc.id,
        ownerEmail: typeof user.email === "string" ? user.email : "",
        ownerName: typeof user.name === "string" ? user.name : "RemoteForge User",
        name: typeof data.name === "string" ? data.name : "Unknown Device",
        type: typeof data.type === "string" ? data.type : "unknown",
        brand: typeof data.brand === "string" ? data.brand : "unknown",
        platform: typeof data.platform === "string" ? data.platform : "device",
        ipAddress: typeof data.ipAddress === "string" ? data.ipAddress : "",
        port: typeof data.port === "number" ? data.port : 0,
        roomName: typeof data.roomName === "string" ? data.roomName : undefined,
      });
    });
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          Devices
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">
          Device Management
        </h1>
        <p className="mt-3 text-white/55">
          View all saved RemoteForge devices across every user.
        </p>
      </div>

      <div className="grid gap-4">
        {devices.map((device) => {
          const Icon = deviceIcon(device.type);

          return (
            <div
              key={`${device.ownerId}-${device.id}`}
              className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                  <Icon className="text-cyan-300" size={26} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-lg font-black">{device.name}</p>
                  <p className="mt-1 text-sm font-semibold text-white/45">
                    {device.brand} • {device.type} • {device.platform}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/35">
                    {device.ipAddress}:{device.port || "default"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
                  <p className="font-black text-white">{device.ownerName}</p>
                  <p className="text-white/40">{device.ownerEmail || "No email"}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/60">
                  {device.roomName || "Unassigned"}
                </div>
              </div>
            </div>
          );
        })}

        {devices.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center text-white/50">
            No saved devices yet.
          </div>
        )}
      </div>
    </div>
  );
}