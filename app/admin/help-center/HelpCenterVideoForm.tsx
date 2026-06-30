"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, UploadCloud } from "lucide-react";

type FormState = "idle" | "saving" | "saved" | "error";

export default function HelpCenterVideoForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("saving");
    setMessage("");

    try {
      const response = await fetch("/api/admin/help-center", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        id?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Could not save help article.");
      }

      formRef.current?.reset();
      setState("saved");
      setMessage(`Saved help article ${payload.id || ""}`.trim());
      router.refresh();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/25"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black">Upload Help Video</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/45">
            Create or update an app help article and attach an optional video.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <UploadCloud size={22} className="text-cyan-300" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <LabelledInput label="Title" name="title" required />
        <LabelledInput label="Category" name="category" defaultValue="Setup" />
        <LabelledInput label="Slug optional" name="id" />
        <LabelledInput label="Sort order" name="sortOrder" type="number" defaultValue="100" />
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
          Summary
        </span>
        <textarea
          name="summary"
          rows={3}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/40"
          placeholder="Short answer shown in the app list."
        />
      </label>

      <label className="mt-4 block">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
          Article Body
        </span>
        <textarea
          name="body"
          rows={7}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/40"
          placeholder="Write the help steps shown inside RemoteForge."
        />
      </label>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <LabelledInput
          label="Tags"
          name="tags"
          placeholder="roku, setup, pairing"
        />
        <LabelledInput label="Video title" name="videoTitle" />
      </div>

      <label className="mt-4 block rounded-2xl border border-dashed border-white/15 bg-black/20 p-4">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
          Video File
        </span>
        <input
          name="video"
          type="file"
          accept="video/*"
          className="mt-3 block w-full cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-bold text-white file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-black file:text-slate-950"
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-3 text-sm font-bold text-white/70">
          <input
            name="isActive"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-white/20 bg-black/30 accent-cyan-300"
          />
          Active in app
        </label>

        <button
          type="submit"
          disabled={state === "saving"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "saving" ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}
          {state === "saving" ? "Saving..." : "Save Article"}
        </button>
      </div>

      {message ? (
        <p
          className={[
            "mt-4 rounded-2xl border px-4 py-3 text-sm font-bold",
            state === "error"
              ? "border-red-400/20 bg-red-400/10 text-red-200"
              : "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function LabelledInput({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/40"
      />
    </label>
  );
}
