"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/react";

export function TrpcPlayground() {
  const t = useTranslations("trpc");
  const format = useFormatter();
  const [name, setName] = useState("");
  const inputId = "trpc-playground-nickname";

  const helloQuery = trpc.example.hello.useQuery({
    name: name.trim() === "" ? undefined : name.trim(),
  });

  const randomNumberQuery = trpc.example.randomNumber.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const generatedAt = randomNumberQuery.data
    ? format.dateTime(new Date(randomNumberQuery.data.generatedAt), {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : null;

  return (
    <section className="w-full space-y-4 border border-black/10 bg-white/80 p-6 dark:border-white/10 dark:bg-black/40">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {t("badge")}
        </p>
        <h2 className="text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {t("description")}
        </p>
      </header>

      <label className="block space-y-2 text-sm font-medium" htmlFor={inputId}>
        <span className="text-neutral-700 dark:text-neutral-200">
          {t("nicknameLabel")}
        </span>
        <Input
          id={inputId}
          placeholder={t("nicknamePlaceholder")}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <div className="space-y-1 bg-neutral-100/80 px-4 py-3 text-neutral-900 dark:bg-white/10 dark:text-white">
        <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {t("helloResult.label")}
        </p>
        <p className="text-lg font-semibold text-black dark:text-white">
          {helloQuery.isLoading
            ? t("helloResult.loading")
            : (helloQuery.data?.greeting ?? t("helloResult.empty"))}
        </p>
      </div>

      <div className="space-y-2 bg-neutral-900/95 px-4 py-4 text-white dark:bg-white/90 dark:text-neutral-900">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral-400">
          <span>{t("random.label")}</span>
          <button
            type="button"
            onClick={() => randomNumberQuery.refetch()}
            disabled={randomNumberQuery.isFetching}
            className="border border-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-800 dark:text-neutral-900 dark:hover:border-neutral-950 dark:hover:bg-neutral-200/80"
          >
            {randomNumberQuery.isFetching
              ? t("random.refreshing")
              : t("random.refresh")}
          </button>
        </div>
        <p className="text-3xl font-bold tabular-nums">
          {randomNumberQuery.data?.value ?? "--"}
        </p>
        <p className="text-xs text-neutral-300 dark:text-neutral-600">
          {generatedAt
            ? t("random.generatedAt", { time: generatedAt })
            : t("random.prompt")}
        </p>
      </div>
    </section>
  );
}
