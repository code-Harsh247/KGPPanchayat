import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authToken = cookies().get("auth_token")?.value;

  if (authToken) {
    return NextResponse.json({ isAuthenticated: true });
  } else {
    return NextResponse.json({ isAuthenticated: false });
  }
}
