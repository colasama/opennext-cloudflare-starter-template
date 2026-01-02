"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OAuthProviders } from "./oauth-providers";
import { signIn } from "@/server/auth/auth-client";

export function SignInForm() {
  const t = useTranslations("auth.signInForm");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const callbackURL = searchParams.get("callbackURL") ?? undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const rememberMe = formData.get("remember") === "on";

    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        rememberMe,
        callbackURL,
      });

      if (result.error) {
        setError(result.error.message ?? t("error"));
        return;
      }

      if (result.data?.redirect && result.data.url) {
        window.location.href = result.data.url;
        return;
      }

      router.refresh();
      router.push(callbackURL ?? "/");
    } catch (err) {
      console.error(err);
      setError(t("genericError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <OAuthProviders callbackURL={callbackURL} />
      <div className="relative text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span className="bg-background px-2">{t("divider")}</span>
        <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="email"
          >
            {t("emailLabel")}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="password"
          >
            {t("passwordLabel")}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="text-muted-foreground">{t("rememberMe")}</span>
          </label>
          <span className="text-xs">{t("forgotPassword")}</span>
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("loading")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </div>
  );
}
