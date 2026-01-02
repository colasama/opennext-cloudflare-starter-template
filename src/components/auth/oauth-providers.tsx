"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "@/server/auth/auth-client";
import { Button } from "@/components/ui/button";

const providers = ["github", "google"] as const;

type OAuthProvidersProps = {
  callbackURL?: string;
};

export function OAuthProviders({ callbackURL }: OAuthProvidersProps) {
  const t = useTranslations("auth.oauth");
  const [activeProvider, setActiveProvider] = useState<
    (typeof providers)[number] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleOAuth = async (provider: (typeof providers)[number]) => {
    setActiveProvider(provider);
    setError(null);

    try {
      const result = await signIn.social({
        provider,
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
    } catch (err) {
      console.error(err);
      setError(t("networkError"));
    } finally {
      setActiveProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <Button
          key={provider}
          type="button"
          variant="outline"
          className="w-full justify-center"
          disabled={activeProvider !== null}
          onClick={() => void handleOAuth(provider)}
        >
          {activeProvider === provider ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>{t(`providers.${provider}`)}</span>
            </>
          ) : (
            t(`providers.${provider}`)
          )}
        </Button>
      ))}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground">{t("hint")}</p>
      )}
    </div>
  );
}
