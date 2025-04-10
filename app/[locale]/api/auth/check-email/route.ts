import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const query = `
      query CheckEmail($email: String!) {
        usersByEmail(email: $email) {
          id
          email
        }
      }
    `;

    console.log("GraphQL request payload:", { query, variables: { email } });

    const response = await fetch(process.env.STEPZEN_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: { email },
      }),
    });

    const result = await response.json();
    console.log("GraphQL response:", result);

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return NextResponse.json(
        { error: "Failed to check email" },
        { status: 500 }
      );
    }

    const userExists = result.data.usersByEmail.length > 0;

    return NextResponse.json({ exists: userExists });
  } catch (error) {
    console.error("Check email error:", error);
    return NextResponse.json(
      { error: "An error occurred while checking the email" },
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