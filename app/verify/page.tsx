"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { verifyToken } from "@/lib/auth";

type State = "loading" | "success" | "missing" | "error";

export default function VerifyPage() {
  const [state, setState] = useState<State>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    const type = hash.get("type");

    if (!access_token || !refresh_token || !type) {
      queueMicrotask(() => setState("missing"));
      return;
    }

    verifyToken(access_token, refresh_token, type)
      .then(() => setState("success"))
      .catch((err) => {
        setErrorMessage(
          err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.",
        );
        setState("error");
      });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] flex items-center justify-center p-5">
      <div className="w-full max-w-[460px] bg-white rounded-[var(--r-2xl)] shadow-[0_20px_60px_-12px_rgb(0_0_0/0.12),0_4px_16px_-4px_rgb(0_0_0/0.06)] p-8 sm:p-10">
        <div className="mb-8">
          <Link href="/" className="kasigo-wordmark">
            <span className="kasigo-mark">K</span>
            <span>Kasigo</span>
          </Link>
        </div>

        {state === "loading" && (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <Loader2 size={40} className="animate-spin text-[var(--accent)]" />
            <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--fg)]">
              Memverifikasi akun...
            </h1>
            <p className="text-sm text-[var(--fg-muted)]">
              Mohon tunggu sebentar.
            </p>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <CheckCircle size={40} className="text-green-500" />
            <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--fg)]">
              Akun terverifikasi!
            </h1>
            <p className="text-sm text-[var(--fg-muted)]">
              Kamu akan diarahkan ke dashboard sebentar lagi.
            </p>
          </div>
        )}

        {state === "missing" && (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <XCircle size={40} className="text-red-500" />
            <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--fg)]">
              Link tidak valid
            </h1>
            <p className="text-sm text-[var(--fg-muted)]">
              Link verifikasi ini tidak valid atau sudah kadaluarsa. Silakan
              daftar ulang atau hubungi support.
            </p>
            <Link
              href="/signup"
              className="btn btn-primary btn-lg w-full inline-flex items-center justify-center"
            >
              Daftar ulang
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <XCircle size={40} className="text-red-500" />
            <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--fg)]">
              Verifikasi gagal
            </h1>
            <p className="text-sm text-[var(--fg-muted)]">
              {errorMessage}
            </p>
            <Link
              href="/signin"
              className="btn btn-primary btn-lg w-full inline-flex items-center justify-center"
            >
              Masuk
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
