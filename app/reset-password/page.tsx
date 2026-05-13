"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setAccessToken(hash.get("access_token"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    if (!accessToken) return;
    try {
      await resetPassword(accessToken, values.password);
      toast.success("Password berhasil diubah.");
      router.push("/signin");
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

        {!accessToken ? (
          /* Invalid / missing token state */
          <div className="text-center py-4">
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--fg)] mb-1.5">
              Link tidak valid
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mb-7">
              Link reset password ini tidak valid atau sudah kadaluarsa. Silakan
              minta link baru.
            </p>
            <Link
              href="/forgot-password"
              className="btn btn-primary btn-lg w-full inline-flex items-center justify-center"
            >
              Minta link baru
              <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--fg)] mb-1.5">
              Buat password baru.
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mb-7">
              Password baru harus berbeda dari password sebelumnya.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* New password */}
              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-[var(--fg)] mb-1.5">
                  Password baru
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)] pointer-events-none">
                    <Lock size={15} />
                  </span>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
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

              {/* Confirm password */}
              <div className="mb-6">
                <label className="block text-[13px] font-semibold text-[var(--fg)] mb-1.5">
                  Konfirmasi password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)] pointer-events-none">
                    <Lock size={15} />
                  </span>
                  <input
                    {...register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    className="w-full pl-10 pr-10 py-[11px] text-sm bg-white border border-[var(--border-strong)] rounded-[var(--r-lg)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] outline-none focus:border-[var(--accent)] transition-colors duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-150"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword.message}
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
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Simpan password baru
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
