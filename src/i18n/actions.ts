"use server";

import { cookies } from "next/headers";

import { LOCALE_COOKIE_NAME, isLocale, type Locale } from "./settings";

export async function setUserLocale(locale: Locale) {
  if (!isLocale(locale)) {
    return;
  }

  const store = await cookies();
  store.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}
