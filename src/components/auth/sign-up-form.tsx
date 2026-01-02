"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OAuthProviders } from "./oauth-providers";
import { signUp } from "@/server/auth/auth-client";

export function SignUpForm() {
  const t = useTranslations("auth.signUpForm");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const callbackURL = searchParams.get("callbackURL") ?? undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError(t("mismatch"));
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL,
      });

      if (result.error) {
        setError(result.error.message ?? t("error"));
        return;
      }

      if (result.data?.token) {
        router.refresh();
        router.push(callbackURL ?? "/");
        return;
      }

      setSuccessMessage(t("success"));
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
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            {t("nameLabel")}
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            required
          />
        </div>
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
            placeholder={t("passwordPlaceholder")}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="confirmPassword"
          >
            {t("confirmPasswordLabel")}
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {successMessage ? (
          <p className="text-sm text-emerald-600" aria-live="polite">
            {successMessage}
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
      <p className="text-center text-xs text-muted-foreground">
        {t.rich("terms", {
          terms: (chunks) => (
            <Link
              href="/terms"
              className="font-medium text-primary hover:underline"
            >
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link
              href="/privacy"
              className="font-medium text-primary hover:underline"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
