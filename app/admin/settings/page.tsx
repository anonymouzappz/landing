import { adminDb } from "@/src/lib/firebase-admin";
import { Settings, ShieldCheck, Sparkles } from "lucide-react";

type AppSettings = {
  maintenanceMode: boolean;
  downloadsEnabled: boolean;
  latestCompanionVersion: string;
  supportEmail: string;
};

export default async function AdminSettingsPage() {
  const doc = await adminDb.collection("appConfig").doc("system").get();
  const data = doc.data() || {};

  const settings: AppSettings = {
    maintenanceMode: data.maintenanceMode === true,
    downloadsEnabled: data.downloadsEnabled !== false,
    latestCompanionVersion:
      typeof data.latestCompanionVersion === "string"
        ? data.latestCompanionVersion
        : "1.0.0",
    supportEmail:
      typeof data.supportEmail === "string"
        ? data.supportEmail
        : "support@anonymouzappz.net",
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          Settings
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">
          App Configuration
        </h1>
        <p className="mt-3 text-white/55">
          View global RemoteForge app settings and operational flags.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <SettingCard
          icon={ShieldCheck}
          title="Maintenance Mode"
          value={settings.maintenanceMode ? "Enabled" : "Disabled"}
          active={settings.maintenanceMode}
        />

        <SettingCard
          icon={DownloadIcon}
          title="Downloads"
          value={settings.downloadsEnabled ? "Enabled" : "Disabled"}
          active={settings.downloadsEnabled}
        />

        <SettingCard
          icon={Sparkles}
          title="Latest Companion"
          value={settings.latestCompanionVersion}
          active
        />

        <SettingCard
          icon={Settings}
          title="Support Email"
          value={settings.supportEmail}
          active
        />
      </div>
    </div>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function SettingCard({
  icon: Icon,
  title,
  value,
  active,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div
          className={[
            "flex h-14 w-14 items-center justify-center rounded-2xl border",
            active
              ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-300"
              : "border-white/10 bg-white/5 text-white/35",
          ].join(" ")}
        >
          <Icon size={26} />
        </div>

        <div>
          <p className="text-sm font-bold text-white/45">{title}</p>
          <p className="mt-1 text-2xl font-black">{value}</p>
        </div>
      </div>
    </div>
  );
}