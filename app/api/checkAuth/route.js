import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (authToken) {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false });
}
