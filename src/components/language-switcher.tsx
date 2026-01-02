"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { setUserLocale } from "@/i18n/actions";
import { locales, type Locale } from "@/i18n/settings";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("languageSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    startTransition(() => {
      void setUserLocale(nextLocale).then(() => {
        router.refresh();
      });
    });
  };

  return (
    <label className="fixed right-4 top-4 z-50 flex flex-col gap-1 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {t("label")}
      </span>
      <select
        className="rounded-full border border-transparent bg-transparent text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
        disabled={isPending}
        aria-label={t("label")}
      >
        {locales.map((value) => (
          <option key={value} value={value} className="text-foreground">
            {t(`options.${value}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
