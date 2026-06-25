const SIGN_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/sign-user`;
const FORGOT_PASSWORD_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/forgot-password`;
const RESET_PASSWORD_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/reset-password`;

function getRedirectTo(): string {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  if (!domain) throw new Error("NEXT_PUBLIC_APP_URL is not set");

  return new URL("/reset-password", domain).toString();
}

function getDashboardUrl(slug: string): string {
  const template = process.env.NEXT_PUBLIC_DASHBOARD_URL_TEMPLATE;
  if (!template)
    throw new Error("NEXT_PUBLIC_DASHBOARD_URL_TEMPLATE is not set");
  return template.replace("{slug}", slug);
}

function redirectToDashboard(
  slug: string,
  access_token: string,
  refresh_token: string,
  plan?: string,
) {
  const base = getDashboardUrl(slug);
  const callbackUrl = new URL("/auth/callback", base);
  if (plan) callbackUrl.searchParams.set("plan", plan);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = callbackUrl.toString();

  [
    ["access_token", access_token],
    ["refresh_token", refresh_token],
  ].forEach(([k, v]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

export type SignupResult =
  | { requiresConfirmation: true; message: string }
  | { requiresConfirmation: false };

export async function signup(
  email: string,
  password: string,
  name: string,
  restaurantName: string,
  restaurantSlug: string,
  plan?: string,
  referralCode?: string,
): Promise<SignupResult> {
  const res = await fetch(SIGN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "signup",
      email,
      password,
      name,
      restaurantName,
      restaurantSlug,
      ...(plan ? { plan } : {}),
      ...(referralCode ? { referralCode: referralCode } : {}),
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(
      data.error ?? data.msg ?? "Terjadi kesalahan",
    ) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  if (data.requiresConfirmation) {
    return {
      requiresConfirmation: true,
      message: data.message ?? "Cek email kamu untuk mengaktifkan akun.",
    };
  }

  const { slug, access_token, refresh_token } = data;
  redirectToDashboard(slug, access_token, refresh_token, plan);
  return { requiresConfirmation: false };
}

export async function forgotPassword(email: string): Promise<string> {
  const res = await fetch(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, redirectTo: getRedirectTo() }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(
      data.error ?? data.msg ?? "Terjadi kesalahan",
    ) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  return data.message ?? data.msg ?? "Email reset password telah dikirim.";
}

export async function resetPassword(
  access_token: string,
  new_password: string,
): Promise<string> {
  const res = await fetch(RESET_PASSWORD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token, new_password }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(
      data.error ?? data.msg ?? "Terjadi kesalahan",
    ) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  return data.message ?? data.msg ?? "Password berhasil diubah.";
}

export async function verifyToken(
  access_token: string,
  refresh_token: string,
  type: string,
  plan?: string,
) {
  const res = await fetch(SIGN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "verify_token",
      access_token,
      refresh_token,
      type,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(
      data.error ?? data.msg ?? "Terjadi kesalahan",
    ) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  const { slug } = data;
  redirectToDashboard(slug, access_token, refresh_token, plan);
}

export async function login(email: string, password: string) {
  const res = await fetch(SIGN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(
      data.error ?? data.msg ?? "Terjadi kesalahan",
    ) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  const { slug, access_token, refresh_token } = data;
  redirectToDashboard(slug, access_token, refresh_token);
}
