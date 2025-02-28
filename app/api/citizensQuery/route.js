import { query } from "@/lib/database";

export async function POST(req) {
    try {
        const body = await req.json();
        // Mapping keys to either the column name or an object when a special operator is needed.
        const fields = {
            citizens_id: "citizens_id",
            user_id: "user_id",
            gender: "gender",
            date_of_birth: "date_of_birth",
            household_id: "household_id",
            occupation: "occupation",
            education_level: "education_level",
            income: { column: "income", operator: "<=" } // Income filter with operator
        };

        let sql = "SELECT * FROM citizens WHERE 1=1";
        const params = [];

        for (const [key, value] of Object.entries(fields)) {
            if (body[key]) {
                const { column, operator } = typeof value === "object"
                    ? value
                    : { column: value, operator: "=" };
                sql += ` AND ${column} ${operator} $${params.length + 1}`;
                params.push(body[key]);
            }
        }

        const results = await query(sql, params);
        return Response.json({ results }, { status: 200 });
    } catch (e) {
        console.log("Error in POST /api/citizensQuery", e);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
