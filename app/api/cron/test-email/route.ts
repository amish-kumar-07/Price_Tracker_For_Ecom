// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { buildMail, sendEmail, verifySmtp } from "@/lib/mailer";

export async function GET() {
  try {
    console.log("🧪 Testing email configuration...");
    
    // First verify SMTP
    await verifySmtp();
    
    // Test email data
    const testData = {
      asin: "B0D947DTLT",
      email: "marvelfan5323@gmail.com",
      newPrice: 8499,
      oldPrice: 9000,
      status: "decreased" as const,
    };
    
    console.log("📧 Building test email...");
    const mailOptions = buildMail(testData);
    
    console.log("📤 Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });
    
    console.log("📨 Sending test email...");
    const result = await sendEmail(mailOptions);
    
    return NextResponse.json({
      success: true,
      message: "✅ Test email sent successfully",
      messageId: result.messageId,
      mailOptions: {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      }
    });
    
  } catch (error: any) {
    console.error("❌ Test email failed:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}