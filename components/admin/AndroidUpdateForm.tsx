"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";

type AndroidUpdateFormProps = {
  initialData: {
    latestVersionCode: number;
    latestVersionName: string;
    minimumRequiredVersionCode: number;
    forceUpdate: boolean;
    updateTitle: string;
    updateMessage: string;
    playStoreUrl: string;
  };
};

export default function AndroidUpdateForm({
  initialData,
}: AndroidUpdateFormProps) {
  const [latestVersionCode, setLatestVersionCode] = useState(
    String(initialData.latestVersionCode || 1),
  );
  const [latestVersionName, setLatestVersionName] = useState(
    initialData.latestVersionName || "1.0.0",
  );
  const [minimumRequiredVersionCode, setMinimumRequiredVersionCode] = useState(
    String(initialData.minimumRequiredVersionCode || 1),
  );
  const [forceUpdate, setForceUpdate] = useState(initialData.forceUpdate);
  const [updateTitle, setUpdateTitle] = useState(
    initialData.updateTitle || "RemoteForge update available",
  );
  const [updateMessage, setUpdateMessage] = useState(
    initialData.updateMessage ||
      "Update RemoteForge to get the latest fixes and improvements.",
  );
  const [playStoreUrl, setPlayStoreUrl] = useState(initialData.playStoreUrl);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState("");

  async function save() {
    setLoading(true);
    setSaved("");

    try {
      const res = await fetch("/api/admin/android-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latestVersionCode: Number(latestVersionCode),
          latestVersionName,
          minimumRequiredVersionCode: Number(minimumRequiredVersionCode),
          forceUpdate,
          updateTitle,
          updateMessage,
          playStoreUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      setSaved("Android update settings saved.");
    } catch (e) {
      setSaved(e instanceof Error ? e.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Latest Version Code"
          value={latestVersionCode}
          onChange={setLatestVersionCode}
          placeholder="5"
          type="number"
        />

        <Field
          label="Latest Version Name"
          value={latestVersionName}
          onChange={setLatestVersionName}
          placeholder="1.0.5"
        />

        <Field
          label="Minimum Required Version Code"
          value={minimumRequiredVersionCode}
          onChange={setMinimumRequiredVersionCode}
          placeholder="4"
          type="number"
        />

        <Field
          label="Play Store URL"
          value={playStoreUrl}
          onChange={setPlayStoreUrl}
          placeholder="https://play.google.com/store/apps/details?id=..."
        />

        <Field
          label="Update Title"
          value={updateTitle}
          onChange={setUpdateTitle}
          placeholder="RemoteForge update available"
        />

        <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-black text-white/70">Force Update</p>
          <button
            type="button"
            onClick={() => setForceUpdate((v) => !v)}
            className={[
              "mt-3 rounded-full border px-4 py-2 text-xs font-black",
              forceUpdate
                ? "border-red-300/30 bg-red-300/10 text-red-300"
                : "border-emerald-300/30 bg-emerald-300/10 text-emerald-300",
            ].join(" ")}
          >
            {forceUpdate ? "FORCED UPDATE ON" : "OPTIONAL UPDATE"}
          </button>
        </label>

        <label className="md:col-span-2">
          <p className="mb-2 text-sm font-black text-white/70">
            Update Message
          </p>
          <textarea
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
          />
        </label>
      </div>

      {saved && (
        <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-200">
          {saved}
        </div>
      )}

      <button
        type="button"
        onClick={save}
        disabled={loading}
        className="mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-6 text-sm font-black text-black disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {loading ? "Saving..." : "Save Android Update Settings"}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label>
      <p className="mb-2 text-sm font-black text-white/70">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
      />
    </label>
  );
}