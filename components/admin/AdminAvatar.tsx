"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function AdminAvatar({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <User size={22} className="text-cyan-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}