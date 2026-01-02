interface VerificationEmailProps {
  verificationUrl: string;
  userEmail: string;
}

type StyleObject = Record<string, string | number>;

const styles: Record<string, StyleObject> = {
  main: {
    backgroundColor: "#f4f4f5",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0",
    padding: "0",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    border: "1px solid #e4e4e7",
    maxWidth: "600px",
  },
  contentSection: {
    padding: "32px 48px",
  },
  h1: {
    color: "#09090b",
    fontSize: "24px",
    fontWeight: 600,
    margin: "0 0 24px",
    textAlign: "center",
    letterSpacing: "-0.025em",
  },
  text: {
    color: "#52525b",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "left",
    margin: "0 0 16px",
  },
  buttonContainer: {
    textAlign: "center",
    margin: "32px 0",
  },
  button: {
    backgroundColor: "#84cc16",
    borderRadius: "0px",
    color: "#000000",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
    padding: "12px 32px",
    border: "1px solid #65a30d",
  },
  hr: {
    border: "none",
    borderTop: "1px solid #e4e4e7",
    margin: "32px 0",
  },
  footer: {
    color: "#a1a1aa",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0",
  },
  link: {
    color: "#65a30d",
    textDecoration: "underline",
    wordBreak: "break-all",
  },
  copyright: {
    color: "#a1a1aa",
    fontSize: "12px",
    textAlign: "center",
    margin: "0 0 32px",
    paddingBottom: "24px",
  },
};

const styleAttr = (style: StyleObject) =>
  Object.entries(style)
    .map(([key, value]) => `${toKebabCase(key)}:${value}`)
    .join(";");

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function renderVerificationEmail({
  verificationUrl,
  userEmail,
}: VerificationEmailProps) {
  const html = [
    "<!doctype html>",
    "<html>",
    "<head>",
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
    "<title>Verify your email</title>",
    "</head>",
    `<body style="${styleAttr(styles.main)}">`,
    `<div style="${styleAttr(styles.container)}">`,
    `<div style="${styleAttr(styles.contentSection)}">`,
    `<h1 style="${styleAttr(styles.h1)}">验证您的邮箱</h1>`,
    `<p style="${styleAttr(styles.text)}">感谢您的注册！为了完成 <strong>${userEmail}</strong> 的账户设置，请点击下方按钮验证您的电子邮件地址。</p>`,
    `<div style="${styleAttr(styles.buttonContainer)}">`,
    `<a href="${verificationUrl}" style="${styleAttr(styles.button)}" target="_blank" rel="noopener noreferrer">立即验证邮箱</a>`,
    "</div>",
    `<p style="${styleAttr(styles.text)}">如果您没有创建此账户，请忽略此邮件。链接将在 24 小时后失效。</p>`,
    `<hr style="${styleAttr(styles.hr)}" />`,
    `<p style="${styleAttr(styles.footer)}">如果按钮无法点击，请复制以下链接到浏览器中打开：<br /><a href="${verificationUrl}" style="${styleAttr(styles.link)}">${verificationUrl}</a></p>`,
    "</div>",
    `<p style="${styleAttr(styles.copyright)}">© ${new Date().getFullYear()} Grid Template. All rights reserved.</p>`,
    "</div>",
    "</body>",
    "</html>",
  ].join("");

  return {
    html,
    text: stripHtml(html),
  };
}
