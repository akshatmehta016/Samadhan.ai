"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Landmark,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SamadhanLogoIcon } from "@/components/akshat/common/samadhan-logo";
import { PlatformStatsWidget } from "@/components/akshat/widgets/platform-stats-widget";
import { AkshatProvider } from "@/components/akshat/akshat-context";
import {
  isApiError,
  loginWithCredentials,
  sendOtpCode,
  verifyOtpCode,
} from "@/lib/api/client";
import { cn } from "@/lib/utils";

type LoginRole = "citizen" | "ngo" | "university" | "company" | "government";

interface RoleConfig {
  id: LoginRole;
  label: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  person: string;
  email: string;
  password: string;
  storageKey: string;
  destination: string;
  accent: string;
  activeTab: string;
}

const ROLES: RoleConfig[] = [
  {
    id: "citizen",
    label: "Citizen",
    icon: User,
    title: "Citizen Portal",
    subtitle: "Report civic issues, vote & volunteer",
    person: "Aarav Mehta · Community Solver",
    email: "aarav@samadhan.ai",
    password: "citizen123",
    storageKey: "samadhan.citizen",
    destination: "/",
    accent: "from-teal-500 to-emerald-600",
    activeTab: "bg-teal-50 text-teal-700 ring-teal-300",
  },
  {
    id: "ngo",
    label: "NGO",
    icon: Shield,
    title: "NGO Portal",
    subtitle: "Deploy volunteers, track field operations",
    person: "Aditi Sharma · NGO Partner",
    email: "aditi@samadhan.ai",
    password: "ngo123",
    storageKey: "samadhan.ngo",
    destination: "/ngo",
    accent: "from-amber-500 to-orange-600",
    activeTab: "bg-amber-50 text-amber-700 ring-amber-300",
  },
  {
    id: "university",
    label: "University",
    icon: GraduationCap,
    title: "University Portal",
    subtitle: "Assign teams, track impact & case studies",
    person: "Prof. Aarav Mehta · Coordinator",
    email: "prof@samadhan.ai",
    password: "uni@2026",
    storageKey: "samadhan.university",
    destination: "/university",
    accent: "from-emerald-500 to-teal-700",
    activeTab: "bg-emerald-50 text-emerald-700 ring-emerald-300",
  },
  {
    id: "company",
    label: "Company / CSR",
    icon: Building2,
    title: "Company & CSR Portal",
    subtitle: "Fund fixes, manage assignments & AI insights",
    person: "Aarav Mehta · Operations Manager",
    email: "aarav@samadhan.ai",
    password: "demo1234",
    storageKey: "samadhan.company",
    destination: "/funder",
    accent: "from-indigo-500 to-violet-700",
    activeTab: "bg-indigo-50 text-indigo-700 ring-indigo-300",
  },
  {
    id: "government",
    label: "Gov / Admin",
    icon: Landmark,
    title: "Government Command Center",
    subtitle: "District-collector dashboard, RBAC protected",
    person: "District Admin · Admin",
    email: "admin@samadhan.ai",
    password: "admin@2026",
    storageKey: "samadhan.government",
    destination: "/government",
    accent: "from-sky-600 to-indigo-800",
    activeTab: "bg-sky-50 text-sky-800 ring-sky-300",
  },
];

function RoleLoginForm({ role }: { role: RoleConfig }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAuthed, setJustAuthed] = useState(false);

  const doLogin = async () => {
    if (!email.trim() || !password) {
      setError("Enter both email and password to continue.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await loginWithCredentials(email.trim(), password);
      try {
        window.sessionStorage.setItem(role.storageKey, "true");
      } catch {
        /* storage unavailable */
      }
      setJustAuthed(true);
      setTimeout(() => router.push(role.destination), 300);
    } catch {
      setError("Invalid credentials. Use the demo credentials shown below.");
      setBusy(false);
    }
  };

  const autofill = () => {
    setEmail(role.email);
    setPassword(role.password);
    setError(null);
  };

  return (
    <div className="mt-5 space-y-4">
      <div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-black/10",
              role.accent,
            )}
          >
            <role.icon size={19} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">{role.title}</h2>
            <p className="text-[11px] font-medium text-slate-700">{role.subtitle}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Work email</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
          <Mail size={15} className="shrink-0 text-slate-700" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doLogin()}
            placeholder={role.email}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-700"
          />
        </div>
      </div>

      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Password</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
          <Lock size={15} className="shrink-0 text-slate-700" />
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doLogin()}
            placeholder="••••••••"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-700"
          />
          <button onClick={() => setShow((v) => !v)} className="text-slate-700 transition hover:text-slate-700">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 ring-1 ring-rose-100">
          {error}
        </p>
      )}

      {justAuthed && (
        <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
          <Check size={14} /> Signed in as {role.person.split("·")[0].trim()} — taking you to {role.title}…
        </p>
      )}

      <Button
        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:from-teal-500 hover:to-emerald-600"
        size="lg"
        onClick={doLogin}
        disabled={busy}
      >
        {busy ? (
          "Verifying…"
        ) : (
          <>
            Log in to {role.label} portal <ArrowRight size={16} />
          </>
        )}
      </Button>

      <div className="rounded-2xl bg-teal-50/70 p-3.5 ring-1 ring-teal-100">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-800">
            <KeyRound size={12} className="text-amber-500" /> Demo credentials · {role.person}
          </p>
          <button
            onClick={autofill}
            className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-50"
          >
            Autofill
          </button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-700">
          <div className="overflow-hidden rounded-lg bg-white px-2 py-1.5 ring-1 ring-teal-100">
            <span className="text-slate-700">email</span>
            <span className="block truncate">{role.email}</span>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-2 py-1.5 ring-1 ring-teal-100">
            <span className="text-slate-700">password</span>
            <span className="block">{role.password}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-700">Need to setup identity?</span>
        <Link
          href={`/onboarding?role=${role.id}`}
          className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
        >
          <span>Complete {role.label} Profile</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

function CitizenGatewayForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loginMethod, setLoginMethod] = useState<"mobile" | "email">("mobile");
  const [phoneValue, setPhoneValue] = useState("+91 98765 43210");
  const [emailValue, setEmailValue] = useState("");
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);

  const loginCitizen = () => {
    try {
      window.sessionStorage.setItem("samadhan.citizen", "true");
    } catch {
      /* storage unavailable */
    }
    router.push("/");
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (loginMethod === "mobile") {
      if (phoneValue.length > 4) {
        setOtp("4281");
        setStep(2);
      }
      return;
    }
    if (sending) return;
    setSending(true);
    try {
      const res = await sendOtpCode(emailValue);
      setDevCode(res.devCode ?? null);
      setOtp("");
      setStep(2);
    } catch (err) {
      setError(isApiError(err) ? err.message : "Couldn't request a code. Try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (loginMethod === "mobile") {
      if (otp.length >= 4) {
        setVerifying(true);
        try {
          window.sessionStorage.setItem("samadhan.citizen", "true");
        } catch {
          /* storage unavailable */
        }
        setTimeout(() => {
          router.push("/onboarding?role=citizen");
        }, 500);
      }
      return;
    }
    if (verifying) return;
    setVerifying(true);
    try {
      await verifyOtpCode(emailValue, otp);
      try {
        window.sessionStorage.setItem("samadhan.citizen", "true");
      } catch {
        /* storage unavailable */
      }
      router.push("/onboarding?role=citizen");
    } catch (err) {
      setError(isApiError(err) ? err.message : "Verification failed. Try again.");
      setVerifying(false);
    }
  };

  return (
    <div className="mt-5">
      {step === 1 && (
        <div>
          <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setLoginMethod("mobile")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all",
                loginMethod === "mobile" ? "bg-teal-600 text-white shadow-sm" : "text-slate-700 hover:text-slate-900",
              )}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile Phone</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all",
                loginMethod === "email" ? "bg-teal-600 text-white shadow-sm" : "text-slate-700 hover:text-slate-900",
              )}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Gmail / Email</span>
            </button>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSendCode}>
            <div className="mb-4 mt-4">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                {loginMethod === "mobile" ? "Mobile Number (with OTP)" : "Email ID (with Code)"}
              </label>
              {loginMethod === "mobile" ? (
                <input
                  type="tel"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all placeholder-slate-500 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                  placeholder="+91 98765 43210"
                  required
                />
              ) : (
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all placeholder-slate-500 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              )}
            </div>

            {loginMethod === "mobile" && (
              <div className="mb-4 rounded-2xl bg-teal-50/70 p-3 ring-1 ring-teal-100">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-800">
                    <KeyRound size={12} className="text-amber-500" /> Demo credentials · Citizen Mobile
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoneValue("+91 98765 43210");
                      setError(null);
                    }}
                    className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-50"
                  >
                    Autofill
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between font-mono text-[11px] text-slate-700">
                  <span className="truncate">Number: +91 98765 43210</span>
                  <span className="shrink-0 text-teal-700 font-semibold">OTP: 4281</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-breathing flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-[1.02] hover:bg-teal-700 active:scale-[0.98] disabled:opacity-60"
            >
              {sending ? (
                <span>Requesting code…</span>
              ) : (
                <>
                  <span>Send {loginMethod === "mobile" ? "SMS OTP" : "Verification Code"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2 text-center">
            <button
              type="button"
              onClick={loginCitizen}
              className="mx-auto flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 transition-colors hover:text-teal-700"
            >
              <span>Skip login and explore as Guest</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <div>
              <Link
                href="/onboarding?role=citizen"
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
              >
                <span>New here? Complete Citizen Profile</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-1 text-center text-lg font-bold text-slate-900">Security Verification</h2>
          <p className="mb-2 text-center text-xs text-slate-700">
            We sent a {loginMethod === "email" ? "6-digit" : "4-digit"} code to <br />
            <strong className="text-teal-700">{loginMethod === "email" ? emailValue : phoneValue}</strong>
          </p>

          {devCode && loginMethod === "email" && (
            <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
              <KeyRound className="h-3.5 w-3.5 flex-shrink-0" />
              <span>
                Demo mode — your code is{" "}
                <span className="font-mono text-sm tracking-widest">{devCode}</span>
              </span>
            </div>
          )}

          {loginMethod === "mobile" && (
            <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800">
              <KeyRound className="h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
              <span>
                Demo mode — use mock OTP: <span className="font-mono text-sm tracking-widest">4281</span> (or any 4 digits)
              </span>
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleVerify}>
            <div className="mb-5 flex justify-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={loginMethod === "email" ? 6 : 4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className={cn(
                  "rounded-2xl border border-slate-300 bg-slate-50 py-3 text-center font-mono font-black transition-all focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20 focus:outline-none",
                  loginMethod === "email"
                    ? "w-56 text-2xl tracking-[0.4em]"
                    : "w-48 text-3xl tracking-[0.6em]",
                )}
                placeholder={loginMethod === "email" ? "------" : "----"}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="btn-breathing flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-[1.02] hover:bg-teal-700 active:scale-[0.98] disabled:opacity-60"
            >
              {verifying ? (
                <span>Entering Citizen Portal…</span>
              ) : (
                <>
                  <span>Verify &amp; Enter Citizen Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSendCode}
              disabled={sending || (loginMethod === "email" && !emailValue)}
              className="mt-2.5 flex w-full items-center justify-center gap-1 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-teal-700 disabled:opacity-50"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>{sending ? "Requesting…" : loginMethod === "mobile" ? "Resend mock OTP" : "Resend code"}</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-1 flex w-full items-center justify-center gap-1 py-2 text-xs font-semibold text-slate-700 transition-colors hover:text-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to phone/email</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function LivePlatformActivity() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl pb-4 pt-14">
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold tracking-wide text-teal-700 shadow-sm ring-1 ring-teal-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600" />
          </span>
          Live Platform Activity
        </span>
        <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          A pulse of your city&apos;s civic life
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-700 sm:text-sm">
          Same live issue metrics for every portal — citizens, universities &amp; CSR.
        </p>
      </div>

      <AkshatProvider>
        <PlatformStatsWidget compact={true} columns={6} />
      </AkshatProvider>
    </div>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const active: LoginRole = ROLES.some((r) => r.id === tabParam)
    ? (tabParam as LoginRole)
    : "citizen";
  const role = ROLES.find((r) => r.id === active)!;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] -top-[12%] h-[28rem] w-[28rem] rounded-full bg-teal-300/30 blur-[130px]" />
        <div className="absolute -bottom-[14%] -right-[12%] h-[28rem] w-[28rem] rounded-full bg-orange-300/30 blur-[130px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-300/20 blur-[110px]" />
      </div>

      <div className="relative z-10 flex w-full flex-1 items-center justify-center">
        <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-white/70 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200 sm:h-32 sm:w-32">
            <SamadhanLogoIcon size={72} />
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-200"
          >
            Samadhan<span className="text-teal-600">.ai</span> · Unified Gateway
          </Link>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Samadhan Login
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            One login, any role — verify and we&apos;ll take you to the right workspace.
          </p>
        </div>

        {/* ROLE SWITCHER TABS - ONE LINK ACCESS TO ALL PORTALS */}
        <div className="grid grid-cols-5 gap-1 rounded-2xl bg-white/90 p-1.5 shadow-sm ring-1 ring-slate-200/80 backdrop-blur-md">
          {ROLES.map((r) => {
            const isCurrent = active === r.id;
            return (
              <Link
                key={r.id}
                href={`/login?tab=${r.id}`}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-center transition-all",
                  isCurrent
                    ? "bg-slate-900 text-white shadow-sm font-bold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold",
                )}
              >
                <r.icon size={16} className={isCurrent ? "text-white" : "text-slate-700"} />
                <span className="text-[11px] leading-tight truncate w-full">{r.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="relative">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-teal-400/40 via-emerald-300/40 to-indigo-400/40 blur-lg" />
          <div className="relative rounded-3xl bg-white/85 p-5 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl">
            {active === "citizen" ? <CitizenGatewayForm /> : <RoleLoginForm key={active} role={role} />}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
          <ShieldCheck size={15} className="text-emerald-600" />
          After OTP verification, pick your role to enter the matching portal.
        </div>
        </div>
      </div>

      <LivePlatformActivity />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white" />}>
      <LoginForm />
    </Suspense>
  );
}
