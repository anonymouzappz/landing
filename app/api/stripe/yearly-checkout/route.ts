import { NextResponse } from "next/server";
import { createEarlyBirdCheckout } from "@/src/lib/stripe/createEarlyBirdCheckout";

export const runtime = "nodejs";

export async function GET() {
  try {
    const url = await createEarlyBirdCheckout("yearly");
    return NextResponse.redirect(url, 303);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not start yearly checkout.",
      },
      { status: 500 },
    );
  }
}