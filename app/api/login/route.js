import { query } from "@/lib/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        // ✅ Parse request body
        const body = await req.json();
        const { phone_number, password } = body; 

        // ✅ Validate input
        if (!phone_number || !password || typeof phone_number !== "string" || typeof password !== "string") {
            return NextResponse.json({ error: "Invalid phone_number or password" }, { status: 400 });
        }

        // ✅ Fetch user from database
        const stringQuery = "SELECT * FROM users WHERE phone_number = $1;";
        const result = await query(stringQuery, [phone_number]); 

        // ✅ Check if user exists
        if (result.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const user = result[0]; // Assuming query() returns an array
        const storedHash = user.password_hash; // The hashed password from DB

        // ✅ Compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // ✅ Return success message (avoid exposing sensitive data)
        return NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
