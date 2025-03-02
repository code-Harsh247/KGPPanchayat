import { query } from "@/lib/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function POST(req) {
    try {
        const body = await req.json();
        const { phone_number, password } = body;

        if (!phone_number || !password) {
            return NextResponse.json({ error: "Invalid phone_number or password" }, { status: 400 });
        }

        const stringQuery = "SELECT * FROM users WHERE phone_number = $1;";
        const result = await query(stringQuery, [phone_number]);

        if (result.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const user = result[0];
        const role = user.role;
        const user_id = user.user_id;
        const userName = user.name;
        const userPhone = user.phone_number;

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const SECRET_KEY = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.user_id }, SECRET_KEY, { expiresIn: "24 hours" });

        // ✅ Set HTTP-only cookie
        cookies().set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60,
            path: "/",
        });

        return NextResponse.json({ success: true, UserRole: role, UserID: user.user_id, UserName: userName, UserPhone: userPhone });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
