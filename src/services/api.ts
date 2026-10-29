// Set VITE_API_URL in .env (see .env.example) to your backend base URL.
// Without it the form runs in demo mode and just pretends to succeed.
const API_URL = import.meta.env.VITE_API_URL as string | undefined;

export async function subscribeNewsletter(email: string): Promise<void> {
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 500));
    return;
  }
  const res = await fetch(`${API_URL}/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Subscription failed");
}
