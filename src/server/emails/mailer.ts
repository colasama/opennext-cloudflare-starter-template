import { env } from "@/lib/env";
import { renderPasswordResetEmail } from "./password-reset-email";
import { renderVerificationEmail } from "./verification-email";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

async function postEmail(payload: EmailPayload) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[email] RESEND_API_KEY or RESEND_FROM_EMAIL not configured. Email skipped.",
    );
    return;
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `[email] Failed to send via Resend (${response.status}): ${errorMessage}`,
    );
  }
}

export async function sendVerificationEmail(options: {
  email: string;
  verificationUrl: string;
}) {
  const { html, text } = renderVerificationEmail({
    userEmail: options.email,
    verificationUrl: options.verificationUrl,
  });

  await postEmail({
    to: options.email,
    subject: "Verify your email address",
    html,
    text,
  });
}

export async function sendPasswordResetEmail(options: {
  email: string;
  resetUrl: string;
}) {
  const { html, text } = renderPasswordResetEmail({
    userEmail: options.email,
    resetUrl: options.resetUrl,
  });

  await postEmail({
    to: options.email,
    subject: "Reset your password",
    html,
    text,
  });
}
