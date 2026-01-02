export const locales = ["en", "zh", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes((value ?? "") as Locale);
}

export async function loadMessages(locale: Locale) {
  switch (locale) {
    case "zh":
      return (await import("@/messages/zh.json")).default;
    case "ja":
      return (await import("@/messages/ja.json")).default;
    default:
      return (await import("@/messages/en.json")).default;
  }
}
