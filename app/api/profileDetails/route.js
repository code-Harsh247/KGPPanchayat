import { query } from "@/lib/database";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Request body:", body);
        const { user_id } = body;

        if (!user_id) {
            return Response.json({ message: "user_id is required" }, { status: 400 });
        }

        // Step 1: Fetch the role from the 'users' table using a parameterized query
        const roleResult = await query("SELECT role FROM users WHERE user_id = $1", [user_id]);

        if (!roleResult || roleResult.length === 0) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const userRole = roleResult[0].role;

        // Step 2: Determine the table based on the role
        const roleToTableMap = {
            "Citizen": "citizens",
            "Panchayat_Employee": "panchayat_employees",
            "Government_monitor": "govtmonitors",
            "Admin": "admins"
        };

        const tableName = roleToTableMap[userRole];

        if (!tableName) {
            return Response.json({ message: "Invalid role" }, { status: 403 });
        }

        // Step 3: Fetch all data securely from the respective table
        const data = await query(`SELECT * FROM ${tableName} WHERE user_id = $1`, [user_id]);

        return Response.json({ data }, { status: 200 });

    } catch (error) {
        console.error("Database error:", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
