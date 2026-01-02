import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  const shellTranslations = await getTranslations("auth.shell");
  const pageTranslations = await getTranslations("auth.signInPage");

  return (
    <AuthShell
      brandLabel={shellTranslations("brand")}
      title={pageTranslations("title")}
      description={pageTranslations("description")}
      footer={pageTranslations.rich("footer", {
        signup: (chunks) => (
          <Link
            className="font-medium text-primary hover:underline"
            href="/sign-up"
          >
            {chunks}
          </Link>
        ),
      })}
    >
      <SignInForm />
    </AuthShell>
  );
}
