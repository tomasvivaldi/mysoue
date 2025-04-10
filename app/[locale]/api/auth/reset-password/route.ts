import { NextResponse } from "next/server";
import crypto from "crypto";
import { UPDATE_USER_PASSWORD } from "@/graphql/mutations";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, email, newPassword } = body;

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the token to compare with the stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // First, verify the token and get the user
    const response = await fetch(process.env.STEPZEN_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
          query VerifyResetToken($email: String!) {
            usersByEmail(email: $email) {
              id
              email
              reset_password_token
              reset_password_expires
            }
          }
        `,
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
      user.reset_password_token !== hashedToken ||
      new Date(user.reset_password_expires) < new Date()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const variables = {
        email,
        new_password_hash: hashedPassword,
      };
    // Update the user's password
    try {
        const response = await fetch(process.env.STEPZEN_ENDPOINT!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
          },
          body: JSON.stringify({
            query: UPDATE_USER_PASSWORD,
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

    // Clear the reset token
    const clearTokenResponse = await fetch(process.env.STEPZEN_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
          mutation ClearResetToken($email: String!) {
            updateResetToken(
              email: $email,
              reset_password_token: "",
              reset_password_expires: "1970-01-01T00:00:00.000Z"
            ) {
              id
              email
            }
          }
        `,
        variables: { email },
      }),
    });

    const clearTokenResult = await clearTokenResponse.json();

    if (clearTokenResult.errors) {
      console.error("GraphQL errors:", clearTokenResult.errors);
      // Don't return error here since password was already updated
    }

    return NextResponse.json(
      { message: "Password successfully reset" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An error occurred while resetting the password" },
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