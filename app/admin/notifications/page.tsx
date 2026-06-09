/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Loader2,
  RefreshCw,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { getAuth } from "firebase/auth";

type Target = "all" | "premium" | "user";
type NotificationType =
  | "announcement"
  | "app_update"
  | "premium"
  | "support_reply";

type AdminNotificationUser = {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  isPremium: boolean;
  notificationsEnabled: boolean;
  tokenCount: number;
  lastActiveAt: string;
};

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState<NotificationType>("announcement");
  const [target, setTarget] = useState<Target>("all");
  const [targetUid, setTargetUid] = useState("");

  const [users, setUsers] = useState<AdminNotificationUser[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const selectedUser = users.find((item) => item.uid === targetUid) || null;

  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();

    if (!q) return users;

    return users.filter((item) => {
      return [
        item.name,
        item.email,
        item.uid,
        item.isPremium ? "premium" : "free",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [users, userSearch]);

  async function getAdminIdToken() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("You must be logged in as admin.");
    }

    return user.getIdToken();
  }

  async function loadUsers() {
    setLoadingUsers(true);
    setError("");

    try {
      const adminIdToken = await getAdminIdToken();

      const res = await fetch("/api/admin/notifications/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminIdToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not load users.");
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load users.");
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendNotification() {
    setBusy(true);
    setNotice("");
    setError("");

    try {
      if (target === "user" && !targetUid) {
        throw new Error("Select a user first.");
      }

      const adminIdToken = await getAdminIdToken();

      const res = await fetch("/api/admin/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminIdToken,
          title,
          body,
          type,
          target,
          targetUid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not send notification.");
      }

      setNotice(
        `Sent. Users: ${data.userCount}, Tokens: ${data.tokenCount}, Success: ${data.successCount}, Failed: ${data.failureCount}`,
      );

      setTitle("");
      setBody("");

      if (target !== "user") {
        setTargetUid("");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send notification.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#02030a] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-cyan-300/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                <Bell size={15} />
                Admin Notifications
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Send RemoteForge Push Alerts
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/55">
                Send app updates, announcements, premium messages, and support
                replies to enabled FCM tokens.
              </p>
            </div>

            <button
              type="button"
              onClick={loadUsers}
              disabled={loadingUsers}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-4 py-4 text-sm font-bold text-emerald-200 transition hover:bg-emerald-300/15 disabled:opacity-60"
            >
              {loadingUsers ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <RefreshCw size={17} />
              )}
              Refresh Users
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="grid gap-5">
              <div>
                <label className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="RemoteForge Update Available"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                  Message
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  placeholder="A new RemoteForge update is ready. Open Settings → Check for Updates."
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-bold leading-6 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as NotificationType)
                    }
                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm font-bold text-white outline-none focus:border-cyan-300/40"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="app_update">App Update</option>
                    <option value="premium">Premium</option>
                    <option value="support_reply">Support Reply</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                    Target
                  </label>
                  <select
                    value={target}
                    onChange={(e) => {
                      const value = e.target.value as Target;
                      setTarget(value);

                      if (value !== "user") {
                        setTargetUid("");
                      }
                    }}
                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm font-bold text-white outline-none focus:border-cyan-300/40"
                  >
                    <option value="all">All users</option>
                    <option value="premium">Premium users</option>
                    <option value="user">Single selected user</option>
                  </select>
                </div>
              </div>

              {target === "user" ? (
                <div className="rounded-[1.5rem] border border-cyan-300/10 bg-black/20 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                      Select Non-Guest User
                    </label>

                    <p className="text-xs font-bold text-white/35">
                      {filteredUsers.length} shown / {users.length} users
                    </p>
                  </div>

                  <div className="relative mt-3">
                    <Search
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                    />
                    <input
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search name, email, UID, premium..."
                      className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
                    />
                  </div>

                  <div className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1">
                    {loadingUsers ? (
                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white/55">
                        <Loader2 size={17} className="animate-spin" />
                        Loading users...
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white/45">
                        No non-guest users found.
                      </div>
                    ) : (
                      filteredUsers.map((item) => {
                        const selected = item.uid === targetUid;

                        return (
                          <button
                            key={item.uid}
                            type="button"
                            onClick={() => setTargetUid(item.uid)}
                            className={[
                              "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition",
                              selected
                                ? "border-cyan-300/40 bg-cyan-300/10"
                                : "border-white/10 bg-white/[0.035] hover:border-cyan-300/20 hover:bg-cyan-300/5",
                            ].join(" ")}
                          >
                            <UserAvatar user={item} />

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate font-black text-white">
                                  {item.name}
                                </p>

                                {item.isPremium ? (
                                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-200">
                                    Premium
                                  </span>
                                ) : null}

                                {!item.notificationsEnabled ? (
                                  <span className="rounded-full border border-red-300/20 bg-red-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-red-200">
                                    Off
                                  </span>
                                ) : null}
                              </div>

                              <p className="mt-1 truncate text-xs font-bold text-white/45">
                                {item.email}
                              </p>

                              <p className="mt-1 truncate text-[10px] font-bold text-white/25">
                                {item.uid}
                              </p>
                            </div>

                            <div className="shrink-0 text-right">
                              <p className="text-xs font-black text-cyan-200">
                                {item.tokenCount}
                              </p>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                                tokens
                              </p>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>

                  {selectedUser ? (
                    <div className="mt-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm font-bold text-emerald-200">
                      Selected: {selectedUser.name} — {selectedUser.email}
                    </div>
                  ) : (
                    <div className="mt-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-sm font-bold text-amber-200">
                      Select a user before sending.
                    </div>
                  )}
                </div>
              ) : null}

              {notice ? (
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">
                  {notice}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm font-bold text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                disabled={busy || (target === "user" && !targetUid)}
                onClick={sendNotification}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-6 py-4 text-sm font-black text-black shadow-[0_0_35px_rgba(34,211,238,.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {busy ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </section>

          <aside className="space-y-4">
            <PreviewCard title={title} body={body} type={type} />
            <TargetCard
              target={target}
              selectedUser={selectedUser}
              userCount={users.length}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

function UserAvatar({ user }: { user: AdminNotificationUser }) {
  if (user.photoUrl) {
    return (
      <img
        src={user.photoUrl}
        alt=""
        className="h-11 w-11 shrink-0 rounded-2xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
      <User className="text-cyan-300" size={19} />
    </div>
  );
}

function PreviewCard({
  title,
  body,
  type,
}: {
  title: string;
  body: string;
  type: NotificationType;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
        Preview
      </p>

      <div className="mt-4 rounded-3xl border border-cyan-300/15 bg-black/35 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 text-black">
            <Bell size={20} />
          </div>

          <div>
            <p className="font-black text-white">
              {title || "RemoteForge Notification"}
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-white/55">
              {body || "Your message preview will show here."}
            </p>
            <p className="mt-2 text-xs font-black uppercase tracking-wider text-cyan-300">
              {type.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TargetCard({
  target,
  selectedUser,
  userCount,
}: {
  target: Target;
  selectedUser: AdminNotificationUser | null;
  userCount: number;
}) {
  const Icon = target === "all" ? Users : target === "premium" ? Rocket : User;

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <Icon className="text-cyan-300" size={20} />
        </div>

        <div className="min-w-0">
          <p className="font-black text-white">
            {target === "all"
              ? "All Users"
              : target === "premium"
                ? "Premium Users"
                : selectedUser
                  ? selectedUser.name
                  : "Single User"}
          </p>
          <p className="mt-1 truncate text-xs font-bold text-white/45">
            {target === "user" && selectedUser
              ? selectedUser.email
              : `${userCount} non-guest users loaded`}
          </p>
        </div>
      </div>
    </div>
  );
}