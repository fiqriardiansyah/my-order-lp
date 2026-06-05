"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Store,
  Link2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { signup } from "@/lib/auth";
import { MailCheck } from "lucide-react";

const PLAN_INFO = {
  warung: {
    name: 'Warung',
    price: 'Rp 99.000',
    note: 'atau Rp 950.000 / tahun (hemat 2 bulan)',
    badgeClass: 'bg-blue-50 text-blue-600',
  },
  restoran: {
    name: 'Restoran',
    price: 'Rp 249.000',
    note: 'atau Rp 2.390.000 / tahun (hemat 2 bulan)',
    badgeClass: 'bg-amber-50 text-amber-600',
  },
} as const;

const schema = z
  .object({
    name: z.string().min(1, "Nama lengkap wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
    restaurantName: z.string().min(1, "Nama restoran wajib diisi"),
    restaurantSlug: z.string().min(1, "URL restoran wajib diisi"),
    agreed: z.boolean().refine((v) => v === true, {
      message: "Kamu harus menyetujui syarat & ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function LiveOrdersMockup() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 14,
        overflow: "hidden",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Live Orders
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 600,
            color: "#4ade80",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: "#4ade80",
              boxShadow: "0 0 0 3px rgba(74,222,128,0.25)",
              display: "block",
            }}
          />
          Active
        </span>
      </div>

      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>
              Table 7
              <span
                style={{
                  fontWeight: 400,
                  color: "#9ca3af",
                  marginLeft: 6,
                  fontSize: 11,
                }}
              >
                · #1247 · just now
              </span>
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 9999,
                background: "#16a34a",
                color: "#fff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              NEW
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#374151" }}>1× Mie Ayam</div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>
              Table 12
              <span
                style={{
                  fontWeight: 400,
                  color: "#9ca3af",
                  marginLeft: 6,
                  fontSize: 11,
                }}
              >
                · #1252 · 6m
              </span>
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 9999,
                background: "#fffbeb",
                color: "#d97706",
                border: "1px solid #fef08a",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              PREP
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
              textDecoration: "line-through",
              lineHeight: 1.6,
            }}
          >
            <div>1× Sate Ayam</div>
            <div>2× Lontong</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignupContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") ?? "";
  const plan = planId in PLAN_INFO ? PLAN_INFO[planId as keyof typeof PLAN_INFO] : null;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [confirmed, setConfirmed] = useState<{ email: string; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { agreed: false, restaurantSlug: "" },
  });

  const watchedRestaurantName = useWatch({
    control,
    name: "restaurantName",
    defaultValue: "",
  });
  const restaurantSlug = useWatch({
    control,
    name: "restaurantSlug",
    defaultValue: "",
  });
  const agreed = useWatch({ control, name: "agreed", defaultValue: false });

  function handleRestaurantNameChange(val: string) {
    setValue("restaurantName", val, { shouldValidate: true });
    if (!slugEdited)
      setValue("restaurantSlug", toSlug(val), { shouldValidate: true });
  }

  function handleSlugChange(val: string) {
    const slug = toSlug(val);
    setValue("restaurantSlug", slug, { shouldValidate: true });
    setSlugEdited(slug !== toSlug(watchedRestaurantName));
  }

  async function onSubmit(values: FormValues) {
    try {
      const result = await signup(
        values.email,
        values.password,
        values.name,
        values.restaurantName,
        values.restaurantSlug,
        planId || undefined,
      );
      if (result.requiresConfirmation) {
        setConfirmed({ email: values.email, message: result.message });
      }
    } catch (err) {
      setError("restaurantSlug", {
        message: (err as Error)?.message || "Terjadi kesalahan. Coba lagi.",
      });
      toast.error(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.",
      );
    }
  }

  if (confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50">
            <MailCheck size={32} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-(--fg)">
              Cek email kamu
            </h1>
            <p className="text-sm leading-relaxed text-(--fg-muted)">
              Kami mengirim tautan konfirmasi ke{" "}
              <span className="font-semibold text-(--fg)">{confirmed.email}</span>.
              Klik tautan tersebut untuk mengaktifkan akun Kasigo kamu.
            </p>
          </div>
          <p className="text-xs text-(--fg-subtle)">
            Tidak ada email? Cek folder spam, atau{" "}
            <button
              type="button"
              className="font-semibold text-(--accent) underline underline-offset-2"
              onClick={() => setConfirmed(null)}
            >
              coba daftar ulang
            </button>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="signup-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
      }}
    >
      {/* ── Left: Form ──────────────────────────────────────── */}
      <div
        className="signup-form-col"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "32px 48px",
          background: "#fff",
          overflowY: "auto",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 48,
          }}
        >
          <Link
            href="/"
            className="kasigo-wordmark"
            style={{ textDecoration: "none" }}
          >
            <span className="kasigo-mark">K</span>
            <span>Kasigo</span>
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} />
            Kembali
          </Link>
        </div>

        {/* Heading */}
        <div
          style={{ maxWidth: 400, width: "100%", margin: "0 auto", flex: 1 }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
              margin: "0 0 8px",
            }}
          >
            {plan ? `Mulai dengan Paket ${plan.name}.` : "Mulai pakai Kasigo gratis."}
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--fg-muted)",
              margin: "0 0 24px",
            }}
          >
            Sudah punya akun?{" "}
            <a
              href="/signin"
              style={{
                color: "var(--accent)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Masuk di sini
            </a>
          </p>

          {plan && (
            <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--bg-cream) px-4 py-3 mb-8">
              <div className="flex items-center gap-2.5">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${plan.badgeClass}`}>
                  {plan.name}
                </span>
                <span className="text-sm font-semibold text-(--fg)">{plan.price} <span className="font-normal text-(--fg-muted)">/ bulan</span></span>
              </div>
              <span className="text-[11px] text-(--fg-subtle) hidden sm:block">{plan.note}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Nama lengkap</label>
                <div style={inputWrapStyle}>
                  <span style={iconWrapStyle}>
                    <User size={15} />
                  </span>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Rini Wijayanti"
                    style={inputStyle}
                  />
                </div>
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <div style={inputWrapStyle}>
                  <span style={iconWrapStyle}>
                    <Mail size={15} />
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="rini@example.com"
                    style={inputStyle}
                  />
                </div>
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <div style={inputWrapStyle}>
                  <span style={iconWrapStyle}>
                    <Lock size={15} />
                  </span>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    style={{ ...inputStyle, paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--fg-muted)",
                      lineHeight: 0,
                    }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </div>

              <div>
                <label style={labelStyle}>Konfirmasi password</label>
                <div style={inputWrapStyle}>
                  <span style={iconWrapStyle}>
                    <Lock size={15} />
                  </span>
                  <input
                    {...register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Ketik ulang password"
                    style={{ ...inputStyle, paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--fg-muted)",
                      lineHeight: 0,
                    }}
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </div>
            </div>

            {/* Restaurant section */}
            <div
              style={{
                marginTop: 40,
                background: "linear-gradient(135deg, #f0fdf8 0%, #ecfdf5 100%)",
                border: "1.5px solid #6ee7b7",
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Store size={14} color="#fff" />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--accent)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Informasi Restoran
                </span>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {/* Restaurant Name */}
                <div>
                  <label style={labelStyle}>Nama restoran</label>
                  <div style={inputWrapStyle}>
                    <span style={iconWrapStyle}>
                      <Store size={15} />
                    </span>
                    <input
                      type="text"
                      value={watchedRestaurantName}
                      onChange={(e) =>
                        handleRestaurantNameChange(e.target.value)
                      }
                      placeholder="Warung Ibu Sari"
                      style={inputStyle}
                    />
                  </div>
                  {errors.restaurantName && (
                    <FieldError>{errors.restaurantName.message}</FieldError>
                  )}
                </div>

                {/* Slug (display only, derived from restaurantName) */}
                <div>
                  <label
                    style={{
                      ...labelStyle,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>URL restoran kamu</span>
                    {slugEdited && (
                      <button
                        type="button"
                        onClick={() => {
                          setValue(
                            "restaurantSlug",
                            toSlug(watchedRestaurantName),
                            { shouldValidate: true },
                          );
                          setSlugEdited(false);
                        }}
                        style={{
                          fontSize: 11,
                          color: "var(--accent)",
                          fontWeight: 600,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        Reset otomatis
                      </button>
                    )}
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid var(--border-strong)",
                      borderRadius: "var(--r-lg)",
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    <input
                      type="text"
                      value={restaurantSlug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="warung-ibu-sari"
                      style={{
                        ...inputStyle,
                        padding: "11px 12px",
                        border: "none",
                        borderRadius: 0,
                        flex: 1,
                        boxShadow: "none",
                      }}
                    />
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "11px 12px",
                        fontSize: 13,
                        color: "var(--fg-subtle)",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        borderRight: "1px solid var(--border)",
                        background: "#f9fafb",
                      }}
                    >
                      <Link2 size={14} />
                      {process.env.NEXT_PUBLIC_DOMAIN}
                    </span>
                  </div>
                  {restaurantSlug && !errors.restaurantSlug && (
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--fg-muted)",
                        marginTop: 5,
                      }}
                    >
                      Pelanggan kamu akan pesan di{" "}
                      <span style={{ fontWeight: 600, color: "var(--accent)" }}>
                        {restaurantSlug}.{process.env.NEXT_PUBLIC_DOMAIN}
                      </span>
                    </p>
                  )}
                  {errors.restaurantSlug && (
                    <FieldError>{errors.restaurantSlug.message}</FieldError>
                  )}
                </div>
              </div>
            </div>

            {/* Terms */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginTop: 20,
                cursor: "pointer",
                fontSize: 13,
                color: "var(--fg-muted)",
                lineHeight: 1.5,
              }}
            >
              <input
                {...register("agreed")}
                type="checkbox"
                style={{
                  marginTop: 2,
                  accentColor: "var(--accent)",
                  width: 15,
                  height: 15,
                  flexShrink: 0,
                }}
              />
              <span>
                Saya setuju dengan Syarat &amp; Ketentuan dan Kebijakan Privasi
                Kasigo.
              </span>
            </label>
            {errors.agreed && <FieldError>{errors.agreed.message}</FieldError>}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={!agreed || isSubmitting}
              style={{
                width: "100%",
                marginTop: 20,
                opacity: agreed && !isSubmitting ? 1 : 0.55,
                cursor: agreed && !isSubmitting ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Membuat akun...
                </>
              ) : (
                <>
                  Buat akun gratis
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "var(--fg-subtle)",
                marginTop: 16,
              }}
            >
              Setup butuh ~10 menit. Tanpa kartu kredit. Server di Indonesia.
            </p>
          </form>
        </div>
      </div>

      {/* ── Right: Testimonial panel ─────────────────────────── */}
      <div
        className="signup-panel-right"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 56px 48px",
          background: "linear-gradient(160deg, #0f6e56 0%, #0a5240 100%)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 0.8,
              color: "var(--brand)",
              fontFamily: "Georgia, serif",
              marginBottom: 24,
            }}
          >
            "
          </div>

          <blockquote style={{ margin: 0 }}>
            <p
              style={
                {
                  fontSize: "clamp(22px, 2.8vw, 30px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  margin: "0 0 28px",
                  textWrap: "pretty",
                } as React.CSSProperties
              }
            >
              Sekarang pelanggan pesan sendiri dari HP, dapur kami auto tau.
              Weekend yang dulu chaos, sekarang lancar.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 9999,
                  background: "var(--brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                RW
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  Rini Wijayanti
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  Owner, Warung Ibu — Jakarta
                </div>
              </div>
            </div>
          </blockquote>

          <div style={{ marginTop: 36 }}>
            <LiveOrdersMockup />
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          {[
            { value: "50+", label: "restoran aktif" },
            { value: "2.4x", label: "tabel turnover" },
            { value: "4.9", label: "rating rata-rata" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>{children}</p>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--fg)",
  marginBottom: 6,
};

const inputWrapStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const iconWrapStyle: React.CSSProperties = {
  position: "absolute",
  left: 12,
  color: "var(--fg-subtle)",
  lineHeight: 0,
  pointerEvents: "none",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 12px 11px 38px",
  fontSize: 14,
  color: "var(--fg)",
  background: "#fff",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--r-lg)",
  outline: "none",
  fontFamily: "var(--font-sans)",
  transition: "border-color 150ms",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignupContent />
    </Suspense>
  );
}
