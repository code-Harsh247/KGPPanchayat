import { query } from "@/lib/database";

export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON body

        const {
            citizen_id,
            user_id,
            gender,
            date_of_birth,
            household_id,
            occupation,
            education_level,
            income
        } = body; // Extract parameters from the request body

        // Dynamic SQL Query
        let sql = "SELECT * FROM citizens WHERE 1=1";
        let params = [];

        if (citizen_id) {
            sql += " AND citizen_id = $" + (params.length + 1);
            params.push(citizen_id);
        }
        if (user_id) {
            sql += " AND user_id = $" + (params.length + 1);
            params.push(user_id);
        }
        if (gender) {
            sql += " AND gender = $" + (params.length + 1);
            params.push(gender);
        }
        if (date_of_birth) {
            sql += " AND date_of_birth = $" + (params.length + 1);
            params.push(date_of_birth);
        }
        if (household_id) {
            sql += " AND household_id = $" + (params.length + 1);
            params.push(household_id);
        }
        if (occupation) {
            sql += " AND occupation = $" + (params.length + 1);
            params.push(occupation);
        }
        if (education_level) {
            sql += " AND education_level = $" + (params.length + 1);
            params.push(education_level);
        }
        if (income) { // INCOME LESS THAN OR EQUAL TO
            sql += " AND income <= $" + (params.length + 1);
            params.push(income);
        }

        const results = await query(sql, params);

        return Response.json({ results }, { status: 200 });
    } catch (e) {
        console.log("Error in POST /api/citizensQuery", e);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
