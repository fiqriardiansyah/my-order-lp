@AGENTS.md

# Styling
Use **Tailwind CSS v4** for all styling going forward. The project has `@import "tailwindcss"` in `app/globals.css` — no config file needed. CSS variables defined in globals.css (e.g. `var(--accent)`, `var(--fg)`) are available everywhere and should be reused. Avoid inline `style={{}}` props on new code; use Tailwind utility classes instead.

# Forms & Validation
Use **react-hook-form** + **zod** for all form state and validation. Use **sonner** for toast notifications (import `toast` from `"sonner"` and render `<Toaster />` in the layout).
