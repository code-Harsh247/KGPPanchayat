// app/api/logout/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear the auth cookie
    cookies().delete("auth_token");
    
    return NextResponse.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}