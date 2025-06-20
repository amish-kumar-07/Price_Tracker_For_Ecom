// lib/mailer.ts
import nodemailer from "nodemailer";


/* ------------ Mail transporter (shared) ------------ */
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: process.env.NODE_ENV !== "production", // useful in dev
});


/* ------------ Helper to build the e‑mail ------------ */
export function buildMail({
  asin,
  email,
  newPrice,
  oldPrice,
  status,
}: {
  asin: string;
  email: string;
  newPrice: number;
  oldPrice: number;
  status: "same" | "decreased" | "increased";
}) {
  const productUrl = `https://www.amazon.in/dp/${asin}`;
  const trend =
    status === "decreased"
      ? "dropped 📉"
      : status === "same"
      ? "remains steady 📊"
      : "gone up 📈";

  const subject =
    status === "decreased"
      ? "Price alert: Your product just got cheaper!"
      : `Update on your tracked product – price ${trend}`;

  const html = /* html */ `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;">
      <h2 style="color:#111;">${
        status === "decreased" ? "🎉 Good news!" : "ℹ️ Update"
      }</h2>
      <p>The price for the item you’re tracking <strong>(${asin})</strong> has <strong>${trend}</strong>.</p>

      <table role="presentation" cellspacing="0" cellpadding="8" style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="background:#f5f5f5;">Previous price</td>
          <td style="background:#f5f5f5;">₹${oldPrice.toLocaleString("en‑IN")}</td>
        </tr>
        <tr>
          <td style="background:${
            status === "decreased" ? "#d4edda" : "#fff3cd"
          };">Current price</td>
          <td style="background:${
            status === "decreased" ? "#d4edda" : "#fff3cd"
          };"><strong>₹${newPrice.toLocaleString("en-IN")}</strong></td>
        </tr>
      </table>

      <p style="margin:24px 0;">
        <a href="${productUrl}"
           style="display:inline-block;padding:12px 18px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">
          View product
        </a>
      </p>

      <p style="font-size:0.85rem;color:#666;">
        You asked us to notify you when the price stayed the same or dropped.
        Manage your alerts or frequency in your Price‑Tracker dashboard.
      </p>
    </div>
  `;

  const text = `
${status === "decreased" ? "Good news!" : "Update"} – the price for ASIN ${asin} has ${trend}.
Old price: ₹${oldPrice}
New price: ₹${newPrice}

Product link: ${productUrl}

You’re receiving this because you set up an alert in the Price‑Tracker app.
`;

  return {
    from: `"Price‑Tracker" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email.toLowerCase(),
    subject,
    html,
    text,
  };
}

/* ------------ Optional one‑time verify (call once on boot) ------------ */
export async function verifySmtp() {
  try {
    await transporter.verify();
    console.log("📨 SMTP connection OK – ready to send e‑mails");
  } catch (err) {
    console.error("❌ SMTP connection failed:", err);
  }
}

// In lib/mailer.ts
export async function sendEmail(mailOptions: ReturnType<typeof buildMail>) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📤 Email sent to:", mailOptions.to, "| Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send email to:", mailOptions.to, error);
    throw error;
  }
}
