"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { fetchSession, isSessionFlag, setSessionFlag } from "@/lib/api/client";

const ROLE_BY_STORAGE_KEY: Record<string, string> = {
  "samadhan.citizen": "citizen",
  "samadhan.ngo": "ngo",
  "samadhan.university": "university",
  "samadhan.company": "company",
  "samadhan.government": "admin",
};

function subscribeStorage() {
  return () => {};
}

function readFlag(storageKey: string) {
  return () => isSessionFlag(storageKey);
}

export function AuthGate({
  storageKey,
  redirectTo,
  children,
}: {
  storageKey: string;
  redirectTo: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const flagged = useSyncExternalStore(subscribeStorage, readFlag(storageKey), () => false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const requiredRole = ROLE_BY_STORAGE_KEY[storageKey];

    void fetchSession().then((session) => {
      if (cancelled) return;
      if (session) {
        if (session.user.role !== requiredRole) {
          try {
            window.sessionStorage.removeItem(storageKey);
          } catch {
            /* storage unavailable */
          }
          router.replace(redirectTo);
          return;
        }
        setSessionFlag(storageKey);
        setRestored(true);
      } else if (!isSessionFlag(storageKey)) {
        router.replace(redirectTo);
      } else {
        setRestored(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [storageKey, redirectTo, router]);

  if (!flagged && !restored) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-700">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          <span className="text-xs font-semibold">Checking access…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}