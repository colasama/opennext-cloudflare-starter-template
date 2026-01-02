import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { TrpcPlayground } from "@/components/trpc-playground";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const t = await getTranslations("home");
  const stepKeys = [
    "hero.steps.stepOne",
    "hero.steps.stepTwo",
    "hero.steps.stepThree",
  ] as const;
  const stepComponents = {
    label: (chunks: ReactNode) => (
      <span className="mr-2 inline-block font-medium text-foreground">
        {chunks}
      </span>
    ),
    code: (chunks: ReactNode) => (
      <code className="rounded-md bg-background px-2 py-1 font-mono text-[13px] font-medium text-primary ring-1 ring-inset ring-border">
        {chunks}
      </code>
    ),
  };
  const steps = stepKeys.map((key) => t.rich(key, stepComponents));
  const helpfulItems = [
    {
      label: t("helpful.labels.api"),
      path: "src/server/api/routers/example.ts",
    },
    {
      label: t("helpful.labels.hooks"),
      path: "src/trpc/react.tsx",
    },
    {
      label: t("helpful.labels.http"),
      path: "src/app/api/trpc/[trpc]/route.ts",
    },
  ];

  return (
    <div className="font-sans flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-16 sm:px-8">
        <Card className="relative overflow-hidden bg-background/60 shadow-none">
          <CardHeader className="gap-8 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted/50 p-3">
                <Image
                  className="dark:invert opacity-90"
                  src="/next.svg"
                  alt={t("hero.altLogo")}
                  width={180}
                  height={38}
                  priority
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
              <div className="space-y-1.5">
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                  {t("hero.heading")}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  {t("hero.description")}
                </CardDescription>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild variant="outline" className="h-10 px-6">
                <Link href="/sign-in">{t("hero.actions.signIn")}</Link>
              </Button>
              <Button asChild className="h-10 px-6 shadow-primary/20">
                <Link href="/sign-up">{t("hero.actions.signUp")}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl bg-muted/40 p-6 ring-1 ring-inset ring-foreground/5">
              <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
                {stepKeys.map((key, index) => (
                  <li className="tracking-tight" key={key}>
                    {steps[index]}
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="relative">
          <TrpcPlayground />
        </div>

        <Card className="border-dashed border-border/60 bg-transparent shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
              {t("helpful.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {helpfulItems.map((item) => (
              <div
                key={item.path}
                className="group flex flex-col gap-2 rounded-lg border bg-card/50 p-3 text-sm transition-colors hover:bg-card"
              >
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">
                  {item.label}
                </span>
                <code
                  className="truncate font-mono text-[11px] text-foreground/80"
                  title={item.path}
                >
                  {item.path}
                </code>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <footer className="mt-auto border-t border-border/40 bg-background/50 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6 text-sm text-muted-foreground">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          >
            <a
              className="flex items-center gap-2"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                className="opacity-60"
                src="/file.svg"
                alt={t("footer.altFile")}
                width={16}
                height={16}
              />
              {t("footer.learn")}
            </a>
          </Button>
          <div className="h-4 w-px bg-border/60" /> {/* Divider */}
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          >
            <a
              className="flex items-center gap-2"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                className="opacity-60"
                src="/globe.svg"
                alt={t("footer.altGlobe")}
                width={16}
                height={16}
              />
              {t("footer.visit")}
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
