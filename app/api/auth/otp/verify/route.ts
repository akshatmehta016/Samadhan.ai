import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSessionCookie, safeSessionCookieOptions } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { OTP_MAX_ATTEMPTS, OTP_TTL_SECONDS } from "@/server/email";
import { SESSION_COOKIE } from "@/server/jwt";
import { EmailOtp, User } from "@/server/models";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_REGEX = /^\d{6}$/;

interface OtpDoc {
  code: string;
  expiresAt: Date;
  attempts: number;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, code } = (body ?? {}) as { email?: string; code?: string };
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (typeof code !== "string" || !CODE_REGEX.test(code)) {
    return NextResponse.json({ error: "Code must be 6 digits" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    await connectToDb();

    const otp = await EmailOtp.findOne({
      email: normalizedEmail,
    }).lean<OtpDoc & { _id: unknown }>();

    if (!otp) {
      return NextResponse.json(
        { error: "No code has been requested for this email" },
        { status: 400 },
      );
    }

    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
      await EmailOtp.deleteOne({ email: normalizedEmail });
      return NextResponse.json(
        { error: "Too many attempts. Request a new code." },
        { status: 429 },
      );
    }

    if (otp.expiresAt.getTime() < Date.now()) {
      await EmailOtp.deleteOne({ email: normalizedEmail });
      return NextResponse.json(
        { error: `This code expired. Request a new one (valid ${OTP_TTL_SECONDS / 60} min).` },
        { status: 410 },
      );
    }

    if (otp.code !== code) {
      const remaining = OTP_MAX_ATTEMPTS - (otp.attempts + 1);
      if (remaining <= 0) {
        await EmailOtp.deleteOne({ email: normalizedEmail });
      } else {
        await EmailOtp.updateOne({ email: normalizedEmail }, { $inc: { attempts: 1 } });
      }
      return NextResponse.json(
        { error: `Incorrect code. ${remaining} attempts remaining.` },
        { status: 401 },
      );
    }

    const nameFromEmail = (value: string) =>
      value
        .split("@")[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ") || "Citizen";

    await EmailOtp.deleteOne({ email: normalizedEmail });

    const user = await User.findOneAndUpdate(
      { email: normalizedEmail, role: "citizen" },
      {
        $setOnInsert: {
          role: "citizen",
          name: nameFromEmail(normalizedEmail),
          email: normalizedEmail,
          passwordHash: bcrypt.hashSync(randomBytes(24).toString("hex"), 10),
          karma: 0,
        },
      },
      { upsert: true, new: true },
    ).lean<{ _id: unknown; role: string; name: string; email: string; orgId?: string }>();

    const sessionUser = {
      id: String(user._id),
      role: user.role,
      name: user.name,
      orgId: user.orgId,
    };

    const token = await createSessionCookie({ sub: sessionUser.id, role: sessionUser.role });
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, safeSessionCookieOptions());

    return NextResponse.json({ user: { ...sessionUser, email: user.email } });
  } catch (err) {
    console.error("[otp verify] Database or auth error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}