import { cookies } from "next/headers";
import { adminAuth } from "@/src/lib/firebase-admin";

export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("rf_admin_token")?.value;

  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);

    const allowedAdmins = (process.env.ADMIN_UIDS || "")
      .split(",")
      .map((uid) => uid.trim())
      .filter(Boolean);

    if (!allowedAdmins.includes(decoded.uid)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}