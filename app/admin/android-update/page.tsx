import AndroidUpdateForm from "@/components/admin/AndroidUpdateForm";
import { adminDb } from "@/src/lib/firebase-admin";

export default async function AndroidUpdatePage() {
  const doc = await adminDb.collection("appConfig").doc("androidUpdate").get();
  const data = doc.data() || {};

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          Android Update
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight">
          App Version Control
        </h1>

        <p className="mt-3 max-w-2xl text-white/55">
          Control the latest Android version, minimum supported version, update
          messaging, and force-update behavior from Firestore.
        </p>
      </div>

      <AndroidUpdateForm
        initialData={{
          latestVersionCode:
            typeof data.latestVersionCode === "number"
              ? data.latestVersionCode
              : 1,
          latestVersionName:
            typeof data.latestVersionName === "string"
              ? data.latestVersionName
              : "1.0.0",
          minimumRequiredVersionCode:
            typeof data.minimumRequiredVersionCode === "number"
              ? data.minimumRequiredVersionCode
              : 1,
          forceUpdate: data.forceUpdate === true,
          updateTitle:
            typeof data.updateTitle === "string"
              ? data.updateTitle
              : "RemoteForge update available",
          updateMessage:
            typeof data.updateMessage === "string"
              ? data.updateMessage
              : "Update RemoteForge to get the latest fixes and improvements.",
          playStoreUrl:
            typeof data.playStoreUrl === "string" ? data.playStoreUrl : "",
        }}
      />
    </div>
  );
}