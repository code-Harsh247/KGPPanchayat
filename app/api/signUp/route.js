import { query } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { household_id, name, dob, gender, educational_qualification, role, password, username } = body;

        // Step 1: Check if household_id exists
        const householdCheckQuery = "SELECT * FROM households WHERE household_id = $1";
        const householdExists = await query(householdCheckQuery, [household_id]);

        if (householdExists.length === 0) {
            return NextResponse.json({ error: "Household ID does not exist." }, { status: 400 });
        }

        // Step 2: Get the current count of citizens to determine new citizen_id
        const countQuery = "SELECT COUNT(*) AS count FROM citizens";
        const countResult = await query(countQuery, []);
        let newCitizenId = parseInt(countResult[0].count) + 1; // Increment count for new citizen_id

        // Step 3: Insert Citizen Data
        const insertCitizenQuery = `
            INSERT INTO citizens (citizen_id, name, gender, dob, household_id, educational_qualification) 
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
        await query(insertCitizenQuery, [newCitizenId, name, gender, dob, household_id, educational_qualification]);

        // Step 4: Insert User Data into usertable
        const insertUserQuery = `
            INSERT INTO usertable (citizen_id, username, password) 
            VALUES ($1, $2, $3);
        `;
        await query(insertUserQuery, [newCitizenId, username, password]);

        return NextResponse.json({ success: true, message: "Signup successful.", citizen_id: newCitizenId }, { status: 201 });

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
