import { LucideIcon } from "lucide-react";

type AdminStatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
};

export default function AdminStatCard({
  title,
  value,
  icon: Icon,
  accent = "text-cyan-300",
}: AdminStatCardProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-white/45 sm:text-sm">
            {title}
          </p>

          <p className="mt-2 break-words text-3xl font-black leading-none sm:text-4xl">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 sm:h-14 sm:w-14">
          <Icon className={accent} size={24} />
        </div>
      </div>
    </div>
  );
}