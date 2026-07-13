import "server-only";

import { cookies } from "next/headers";
import { adminAuth } from "@/src/lib/firebase-admin";

export async function getAdminUser() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("rf_admin_session")?.value;

    if (!session) return null;

    const decoded = await adminAuth.verifySessionCookie(session, true);

    const allowedAdmins = (process.env.ADMIN_UIDS || "")
      .split(",")
      .map((uid) => uid.trim())
      .filter(Boolean);

    if (!allowedAdmins.includes(decoded.uid)) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("getAdminUser failed:", error);
    return null;
  }
}