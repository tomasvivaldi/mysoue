import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Parse the JSON from the request body
  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("Invalid JSON");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body;
  if (!email) {
    console.error("No email provided in request body");
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  console.log("Received forgot-password request for email:", email);

  // Generic response (for security reasons)
  const genericResponse = {
    message: "If a user exists with that email, a reset link will be sent.",
  };

  // Generate a secure random token and hash it for secure storage
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  // Set expiration date (1 hour later)
  const resetExpires = new Date(Date.now() + 3600000).toISOString();

  const variables = {
    email,
    reset_password_token: hashedToken,
    reset_password_expires: resetExpires,
  };

  const mutation = `
    mutation UpdateResetToken($email: String!, $reset_password_token: String!, $reset_password_expires: DateTime!) {
      updateResetToken(
        email: $email,
        reset_password_token: $reset_password_token,
        reset_password_expires: $reset_password_expires
      ) {
        id
        email
        reset_password_token
        reset_password_expires
        updated_at
      }
    }
  `;

  console.log("GraphQL request payload:", { query: mutation, variables });

  try {
    const response = await fetch(process.env.STEPZEN_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });
    const result = await response.json();
    console.log("GraphQL response:", result);
    if (result.errors) {
      console.error("GraphQL errors: ", result.errors);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
  } catch (err) {
    console.error("GraphQL fetch error: ", err);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  // Construct the reset URL using the raw (unhashed) token and the user's email as query parameters.
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  console.log("Constructed reset URL:", resetUrl);

  try {
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailType: "lostPassword",
        to: email,
        resetLink: resetUrl,
      }),
    });
    const emailResult = await emailResponse.json();
    console.log("Send email response:", emailResult);
    return NextResponse.json(genericResponse, { status: 200 });
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}