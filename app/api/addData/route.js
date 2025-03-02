import { pool } from "@/lib/database"; // PostgreSQL connection pool
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { table, data } = await req.json(); // Parse JSON request body

        if (!table || !data) {
            return NextResponse.json({ message: "Table name and data are required." }, { status: 400 });
        }

        // Construct query dynamically
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *;`;
        const result = await pool.query(query, values);

        return NextResponse.json({ message: "Data added successfully!", data: result.rows[0] }, { status: 201 });
    } catch (error) {
        console.error("Error adding data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}   
