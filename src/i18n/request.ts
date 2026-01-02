import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import {
  LOCALE_COOKIE_NAME,
  defaultLocale,
  isLocale,
  loadMessages,
  type Locale,
} from "./settings";

const parseAcceptLanguage = (value: string | null): Locale | null => {
  if (!value) return null;

  const locales = value.split(",").map((part) => part.split(";")[0]?.trim());
  for (const raw of locales) {
    if (!raw) continue;
    const normalized = raw.toLowerCase().split("-")[0];
    if (isLocale(normalized)) {
      return normalized;
    }
  }
  return null;
};

export default getRequestConfig(async () => {
  const store = await cookies();
  const headersStore = await headers();
  const cookieLocale = store.get(LOCALE_COOKIE_NAME)?.value;
  const headerLocale = parseAcceptLanguage(headersStore.get("accept-language"));

  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : (headerLocale ?? defaultLocale);

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
