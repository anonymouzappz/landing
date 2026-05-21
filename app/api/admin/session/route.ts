import { NextResponse } from "next/server";
import { adminAuth } from "@/src/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 },
      );
    }

    const decoded = await adminAuth.verifyIdToken(token);

    const allowedAdmins = (process.env.ADMIN_UIDS || "")
      .split(",")
      .map((uid) => uid.trim())
      .filter(Boolean);

    if (!allowedAdmins.includes(decoded.uid)) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 },
      );
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set("rf_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 },
    );
  }
}