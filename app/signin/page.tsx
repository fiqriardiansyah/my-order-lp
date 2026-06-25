"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/auth";
import { useLoading } from "@/components/LoadingProvider";

const schema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const { setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { email: searchParams.get("email") ?? "", remember: false },
  });

  useEffect(() => {
    setLoading(isSubmitting);
  }, [isSubmitting, setLoading]);

  async function onSubmit(values: FormValues) {
    try {
      await login(values.email, values.password);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] flex items-center justify-center p-5">
      <div className="w-full max-w-[460px] bg-white rounded-[var(--r-2xl)] shadow-[0_20px_60px_-12px_rgb(0_0_0/0.12),0_4px_16px_-4px_rgb(0_0_0/0.06)] p-8 sm:p-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="kasigo-wordmark">
            <span className="kasigo-mark">K</span>
            <span>Kasigo</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-150"
          >
            <ArrowLeft size={14} />
            Kembali
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--fg)] mb-1.5">
          Selamat datang kembali.
        </h1>
        <p className="text-sm text-[var(--fg-muted)] mb-7">
          Belum punya akun?{" "}
          <Link
            href="/signup"
            className="text-[var(--accent)] font-semibold underline underline-offset-[3px]"
          >
            Daftar gratis
          </Link>
        </p>

        {/* Google sign-in */}
        {/* <button
          type="button"
          onClick={() => toast.info('Segera hadir')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-[var(--border-strong)] rounded-[var(--r-lg)] text-sm font-semibold text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-colors duration-150 mb-5"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Masuk dengan Google
        </button> */}

        {/* Divider */}
        {/* <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--fg-subtle)]">
            Atau pakai email
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[var(--fg)] mb-1.5">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)] pointer-events-none">
                <Mail size={15} />
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="kamu@restoran.com"
                className="w-full pl-10 pr-3.5 py-[11px] text-sm bg-white border border-[var(--border-strong)] rounded-[var(--r-lg)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] outline-none focus:border-[var(--accent)] transition-colors duration-150"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13px] font-semibold text-[var(--fg)]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[13px] font-semibold text-[var(--accent)] hover:underline"
              >
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)] pointer-events-none">
                <Lock size={15} />
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password kamu"
                className="w-full pl-10 pr-10 py-[11px] text-sm bg-white border border-[var(--border-strong)] rounded-[var(--r-lg)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] outline-none focus:border-[var(--accent)] transition-colors duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-150"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          {/* <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none">
            <input
              {...register("remember")}
              type="checkbox"
              className="w-[15px] h-[15px] accent-[#0f6e56] rounded cursor-pointer shrink-0"
            />
            <span className="text-sm text-[var(--fg-muted)]">
              Ingat saya di perangkat ini
            </span>
          </label> */}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Masuk...
              </>
            ) : (
              <>
                Masuk
                <span aria-hidden>→</span>
              </>
            )}
          </button>
        </form>

        {/* Support */}
        <p className="text-center text-[13px] text-[var(--fg-muted)] mt-6">
          Butuh bantuan?{" "}
          <a
            href="https://wa.me/6285273580367"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            Hubungi support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SigninPage() {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  );
}
