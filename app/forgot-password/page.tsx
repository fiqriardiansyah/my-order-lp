"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Format email tidak valid"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    try {
      // TODO: call your reset-password API here
      await new Promise((r) => setTimeout(r, 1000));
      setSent(true);
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
            href="/signin"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-150"
          >
            <ArrowLeft size={14} />
            Kembali
          </Link>
        </div>

        {sent ? (
          /* Success state */
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <CheckCircle size={48} className="text-[var(--accent)]" />
            </div>
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--fg)] mb-1.5">
              Email terkirim!
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mb-7">
              Kami mengirim link reset password ke{" "}
              <span className="font-semibold text-[var(--fg)]">
                {getValues("email")}
              </span>
              . Periksa inbox atau folder spam kamu.
            </p>
            <Link
              href="/signin"
              className="btn btn-primary btn-lg w-full inline-flex items-center justify-center"
            >
              Kembali ke masuk
            </Link>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--fg)] mb-1.5">
              Lupa password?
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mb-7">
              Masukkan email akunmu dan kami akan mengirimkan link untuk reset
              password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email */}
              <div className="mb-6">
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

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim link reset
                    <span aria-hidden>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Back to signin */}
            <p className="text-center text-[13px] text-[var(--fg-muted)] mt-6">
              Ingat password kamu?{" "}
              <Link
                href="/signin"
                className="font-bold text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-150"
              >
                Masuk sekarang
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
