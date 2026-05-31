import {
  Mail,
  Send,
  Users,
  UserCheck,
  UserX,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import AdminSubscriberCampaignForm from "./AdminSubscriberCampaignForm";
import { adminDb } from "@/src/lib/firebase-admin";

type Subscriber = {
  id: string;
  email: string;
  name: string;
  status: string;
  source: string;
  tags: string[];
  interests: {
    testing?: boolean;
    updates?: boolean;
    earlyBird?: boolean;
    premium?: boolean;
  };
  marketingOptIn: boolean;
  welcomeEmailSent: boolean;
  welcomeResendEmailId: string;
  welcomeEmailError: string;
  createdAt: string;
  updatedAt: string;
  unsubscribedAt: string;
};

function formatDate(value: unknown) {
  if (!value || typeof value !== "object") return "";

  const timestamp = value as {
    toDate?: () => Date;
  };

  if (typeof timestamp.toDate !== "function") return "";

  return timestamp.toDate().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readBool(value: unknown) {
  return value === true;
}

async function getSubscribers() {
  const snap = await adminDb
    .collection("emailSubscribers")
    .orderBy("updatedAt", "desc")
    .limit(250)
    .get();

  const subscribers: Subscriber[] = snap.docs.map((doc) => {
    const data = doc.data();

    const interests =
      data.interests && typeof data.interests === "object"
        ? (data.interests as Subscriber["interests"])
        : {};

    return {
      id: doc.id,
      email: readString(data.email),
      name: readString(data.name),
      status: readString(data.status) || "unknown",
      source: readString(data.source),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      interests,
      marketingOptIn: readBool(data.marketingOptIn),
      welcomeEmailSent: readBool(data.welcomeEmailSent),
      welcomeResendEmailId: readString(data.welcomeResendEmailId),
      welcomeEmailError: readString(data.welcomeEmailError),
      createdAt: formatDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      unsubscribedAt: formatDate(data.unsubscribedAt),
    };
  });

  return subscribers;
}

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  const total = subscribers.length;
  const subscribed = subscribers.filter((item) => item.status === "subscribed");
  const unsubscribed = subscribers.filter(
    (item) => item.status === "unsubscribed",
  );
  const testing = subscribers.filter((item) => item.tags.includes("testing"));
  const emailSent = subscribers.filter((item) => item.welcomeEmailSent);

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              <Mail size={14} />
              RemoteForge Admin
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Email Subscribers
            </h1>

            <p className="mt-3 max-w-2xl text-white/55">
              View RemoteForge subscribers, check testing interest, and send
              campaign emails to active subscribers.
            </p>
          </div>

          <a
            href="/admin/subscribers"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
          >
            <RefreshCw size={17} />
            Refresh
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={Users}
            label="Total"
            value={total}
            tone="cyan"
          />
          <StatCard
            icon={UserCheck}
            label="Subscribed"
            value={subscribed.length}
            tone="emerald"
          />
          <StatCard
            icon={UserX}
            label="Unsubscribed"
            value={unsubscribed.length}
            tone="amber"
          />
          <StatCard
            icon={Sparkles}
            label="Testing"
            value={testing.length}
            tone="violet"
          />
          <StatCard
            icon={Send}
            label="Welcome Sent"
            value={emailSent.length}
            tone="blue"
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
          <AdminSubscriberCampaignForm />

          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-xl font-black">Subscribers</h2>
              <p className="mt-1 text-sm font-semibold text-white/45">
                Showing latest {subscribers.length} subscribers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-white/[0.035] text-xs uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="px-5 py-4">Subscriber</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Interests</th>
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">Welcome</th>
                    <th className="px-5 py-4">Updated</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {subscribers.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="px-5 py-4">
                        <div className="font-black text-white">
                          {item.name || "No name"}
                        </div>
                        <div className="mt-1 text-white/50">{item.email}</div>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                        {item.unsubscribedAt ? (
                          <div className="mt-2 text-xs text-white/35">
                            {item.unsubscribedAt}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex max-w-xs flex-wrap gap-2">
                          {item.tags.length ? (
                            item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-100"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-white/35">No tags</span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-white/55">
                        {item.source || "website"}
                      </td>

                      <td className="px-5 py-4">
                        {item.welcomeEmailSent ? (
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                            Sent
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-300">
                            Not sent
                          </span>
                        )}

                        {item.welcomeEmailError ? (
                          <div className="mt-2 max-w-xs text-xs text-red-300">
                            {item.welcomeEmailError}
                          </div>
                        ) : null}

                        {item.welcomeResendEmailId ? (
                          <div className="mt-2 max-w-xs truncate text-xs text-white/30">
                            {item.welcomeResendEmailId}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-5 py-4 text-white/45">
                        {item.updatedAt || item.createdAt || "—"}
                      </td>
                    </tr>
                  ))}

                  {!subscribers.length ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-16 text-center text-white/45"
                      >
                        No subscribers yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "subscribed";

  return (
    <span
      className={[
        "rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider",
        active
          ? "bg-emerald-400/10 text-emerald-300"
          : "bg-amber-400/10 text-amber-300",
      ].join(" ")}
    >
      {status || "unknown"}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-white/45">{label}</p>
          <p className="mt-2 text-4xl font-black">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <Icon size={22} className="text-cyan-300" />
        </div>
      </div>
    </div>
  );
}