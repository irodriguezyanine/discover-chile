import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const CLIENT_KEY = "discoverchile.client_key";

export function getOrCreateClientKey() {
  try {
    const existing = window.localStorage.getItem(CLIENT_KEY);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `dc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(CLIENT_KEY, next);
    return next;
  } catch {
    return `dc_${Date.now().toString(36)}`;
  }
}

export type GuestPersistInput = {
  name: string;
  country: string;
  cursor: string;
  currency?: string;
  travelers?: number;
  days?: number;
  style?: string;
};

/** Upsert welcome identity into Supabase (best-effort; never blocks UI). */
export async function persistGuestToSupabase(profile: GuestPersistInput) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false as const, reason: "missing-client" };

  const clientKey = getOrCreateClientKey();
  const payload = {
    client_key: clientKey,
    name: profile.name.trim(),
    country_code: profile.country.toUpperCase(),
    cursor_id: profile.cursor || "moai",
    currency: profile.currency ?? null,
    travelers: profile.travelers ?? 2,
    days: profile.days ?? 12,
    style: profile.style ?? "mid",
    onboarded: true,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("guests").upsert(payload, {
    onConflict: "client_key",
  });

  if (error) {
    console.warn("[supabase] guest upsert failed", error.message);
    return { ok: false as const, reason: error.message };
  }

  return { ok: true as const, clientKey };
}
