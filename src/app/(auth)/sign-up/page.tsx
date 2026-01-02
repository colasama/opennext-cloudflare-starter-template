import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default async function SignUpPage() {
  const shellTranslations = await getTranslations("auth.shell");
  const pageTranslations = await getTranslations("auth.signUpPage");

  return (
    <AuthShell
      brandLabel={shellTranslations("brand")}
      title={pageTranslations("title")}
      description={pageTranslations("description")}
      footer={pageTranslations.rich("footer", {
        signin: (chunks) => (
          <Link
            className="font-medium text-primary hover:underline"
            href="/sign-in"
          >
            {chunks}
          </Link>
        ),
      })}
    >
      <SignUpForm />
    </AuthShell>
  );
}
