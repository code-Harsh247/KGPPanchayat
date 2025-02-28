import { query } from "@/lib/database";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const citizens_id = searchParams.get("citizens_id");
        const user_id = searchParams.get("user_id");
        const gender = searchParams.get("gender");
        const date_of_birth = searchParams.get("date_of_birth");
        const household_id = searchParams.get("household_id");
        const occupation = searchParams.get("occupation");
        const education_level = searchParams.get("education_level");
        const income = searchParams.get("income");

        // Dynamic SQL Query
        let sql = "SELECT * FROM citizens WHERE 1=1";
        let params = [];

        if (citizens_id) {
            sql += " AND citizens_id = $" + (params.length + 1);
            params.push(citizens_id);
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
        console.log("Error in GET /api/citizensQuery", e);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
