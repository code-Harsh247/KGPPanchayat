import { query } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // ✅ Parse request body
        const body = await req.json();
        const { username, password } = body; 

        // ✅ Validate input
        if (!username || !password || typeof username !== "string" || typeof password !== "string") {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 400 });
        }

        // ✅ Safe parameterized query (prevents SQL injection)
        const stringQuery = "SELECT * FROM usertable WHERE username = $1 AND password = $2;";
        const result = await query(stringQuery, [username, password]); 

        // ✅ Check if user exists
        if (result.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // ✅ Return success message (avoid exposing sensitive data)
        return NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
