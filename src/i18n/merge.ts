import type { Messages } from "@/i18n/en";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function mergeMessages(base: Messages, extra: DeepPartial<Messages>): Messages {
  const walk = (current: unknown, patch: unknown): unknown => {
    if (!isObject(current) || !isObject(patch)) return patch ?? current;
    const next: Record<string, unknown> = { ...current };
    for (const [key, value] of Object.entries(patch)) {
      next[key] = walk(current[key], value);
    }
    return next;
  };
  return walk(base, extra) as Messages;
}
