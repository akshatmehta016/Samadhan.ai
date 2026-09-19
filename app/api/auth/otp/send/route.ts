import { NextResponse } from "next/server";

import {
  generateOtpCode,
  OTP_TTL_SECONDS,
  sendOtpEmail,
} from "@/server/email";
import { connectToDb } from "@/server/db";
import { EmailOtp } from "@/server/models";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email } = (body ?? {}) as { email?: string };
  if (typeof email !== "string" || email.trim().length === 0 || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);

  try {
    await connectToDb();
    await EmailOtp.findOneAndUpdate(
      { email: normalizedEmail },
      { code, expiresAt, attempts: 0 },
      { upsert: true, returnDocument: "after" },
    );
  } catch (err) {
    console.error("[otp send] Database error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  const { delivered } = await sendOtpEmail(normalizedEmail, code);

  return NextResponse.json({
    ok: true,
    expiresIn: OTP_TTL_SECONDS,
    ...(delivered === false ? { devCode: code } : {}),
  });
}