export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { getAdminUser } from "@/src/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin-login");
  }

  return <AdminShell>{children}</AdminShell>;
}