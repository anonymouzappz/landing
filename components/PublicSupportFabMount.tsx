"use client";

import { usePathname } from "next/navigation";
import SupportFeedbackFab from "@/components/SupportFeedbackFab";

export default function PublicSupportFabMount() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <SupportFeedbackFab />;
}