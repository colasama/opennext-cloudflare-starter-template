import type { ReactNode } from "react";
import Link from "next/link";

type AuthShellProps = {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
  brandLabel: string;
};

export function AuthShell({
  title,
  description,
  footer,
  children,
  brandLabel,
}: AuthShellProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background/90 p-8 shadow-lg shadow-black/5 backdrop-blur">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
          >
            {brandLabel}
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      </div>
    </div>
  );
}
