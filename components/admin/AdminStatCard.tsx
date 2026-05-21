import { LucideIcon } from "lucide-react";

export default function AdminStatCard({
  title,
  value,
  icon: Icon,
  accent = "text-cyan-300",
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-white/45">{title}</p>
          <p className="mt-2 text-4xl font-black">{value}</p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
          <Icon className={accent} size={26} />
        </div>
      </div>
    </div>
  );
}