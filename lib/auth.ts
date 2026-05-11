const FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/sign-user`;

function getDashboardUrl(slug: string): string {
  const template = process.env.NEXT_PUBLIC_DASHBOARD_URL_TEMPLATE;
  if (!template)
    throw new Error("NEXT_PUBLIC_DASHBOARD_URL_TEMPLATE is not set");
  return template.replace("{slug}", slug);
}

function redirectToDashboard(slug: string, access_token: string, refresh_token: string) {
  const base = getDashboardUrl(slug);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = `${base}/auth/callback`;

  [['access_token', access_token], ['refresh_token', refresh_token]].forEach(([k, v]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

export async function signup(
  email: string,
  password: string,
  name: string,
  restaurantName: string,
  restaurantSlug: string,
) {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "signup",
      email,
      password,
      name,
      restaurantName,
      restaurantSlug,
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

  const { slug, access_token, refresh_token } = data;
  redirectToDashboard(slug, access_token, refresh_token);
}

export async function login(email: string, password: string) {
  const res = await fetch(FUNCTION_URL, {
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
