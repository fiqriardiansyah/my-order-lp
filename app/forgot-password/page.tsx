"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Format email tidak valid"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    try {
      const msg = await forgotPassword(values.email);
      setSuccessMsg(msg);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-(--bg-cream) flex items-center justify-center p-5">
      <div className="w-full max-w-115 bg-white rounded-(--r-2xl) shadow-[0_20px_60px_-12px_rgb(0_0_0/0.12),0_4px_16px_-4px_rgb(0_0_0/0.06)] p-8 sm:p-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="kasigo-wordmark">
            <span className="kasigo-mark">K</span>
            <span>Kasigo</span>
          </Link>
          <Link
            href="/signin"
            className="flex items-center gap-1.5 text-sm font-medium text-(--fg-muted) hover:text-(--fg) transition-colors duration-150"
          >
            <ArrowLeft size={14} />
            Kembali
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-(--fg) mb-1.5">
          Lupa password?
        </h1>
        <p className="text-sm text-(--fg-muted) mb-7">
          Masukkan email akunmu dan kami akan mengirimkan link untuk reset
          password.
        </p>

        {successMsg ? (
          /* Success state — green box with API message */
          <div className="flex gap-3 bg-green-50 border border-green-200 rounded-(--r-lg) p-4 mb-6">
            <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
            <p className="text-sm text-green-800">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-(--fg) mb-1.5">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--fg-subtle) pointer-events-none">
                  <Mail size={15} />
                </span>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="kamu@restoran.com"
                  className="w-full pl-10 pr-3.5 py-2.75 text-sm bg-white border border-(--border-strong) rounded-(--r-lg) text-(--fg) placeholder:text-(--fg-subtle) outline-none focus:border-(--accent) transition-colors duration-150"
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
        )}

        {/* Back to signin */}
        <p className="text-center text-[13px] text-(--fg-muted) mt-6">
          Ingat password kamu?{" "}
          <Link
            href="/signin"
            className="font-bold text-(--fg) hover:text-(--accent) transition-colors duration-150"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
