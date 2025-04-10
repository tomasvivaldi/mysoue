import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, email } = body;

    if (!token || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the token to compare with the stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Verify the token and get the user
    const verifyQuery = `
      query VerifyResetToken($email: String!) {
        usersByEmail(email: $email) {
          id
          email
          reset_password_token
          reset_password_expires
        }
      }
    `;

    const response = await fetch(process.env.STEPZEN_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: verifyQuery,
        variables: { email },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return NextResponse.json(
        { error: "Failed to verify token" },
        { status: 500 }
      );
    }

    const user = result.data.usersByEmail[0];

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if token matches and is not expired
    if (
      !user.reset_password_token ||
      user.reset_password_token !== hashedToken ||
      new Date(user.reset_password_expires) < new Date()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { error: "An error occurred while validating the token" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
} 