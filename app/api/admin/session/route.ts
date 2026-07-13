import { NextResponse } from "next/server";
import { adminAuth } from "@/src/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { token, rememberMe } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(token, true);

    console.log("ADMIN LOGIN UID:", decoded.uid);
    console.log("ADMIN_UIDS ENV:", process.env.ADMIN_UIDS);

    const allowedAdmins = (process.env.ADMIN_UIDS || "")
      .split(",")
      .map((uid) => uid.trim())
      .filter(Boolean);

    if (!allowedAdmins.includes(decoded.uid)) {
      return NextResponse.json(
        {
          error: `Not authorized. UID is ${decoded.uid}`,
        },
        { status: 403 },
      );
    }

  const expiresIn = rememberMe
  ? 1000 * 60 * 60 * 24 * 14
  : 1000 * 60 * 60 * 8;

    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set("rf_admin_session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(expiresIn / 1000),
    });

    return res;
  } catch (error) {
    console.error("ADMIN SESSION ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Invalid admin login";

    return NextResponse.json(
      { error: message },
      { status: 401 },
    );
  }
}