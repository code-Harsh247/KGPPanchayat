import { query } from "@/lib/database";

export async function POST(req) {
    try {
        const body = await req.json();

        // Validate table name (whitelist approach recommended)
        if (typeof body.table !== "string" || !/^[a-zA-Z0-9_]+$/.test(body.table)) {
            return Response.json({ message: "Invalid table name" }, { status: 400 });
        }

        // Validate and sanitize column names
        const columns = Array.isArray(body.columns) && body.columns.every(col => /^[a-zA-Z0-9_*]+$/.test(col))
            ? body.columns.join(", ")
            : "*";

        // Allowed SQL operators to prevent injection
        const allowedOperators = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN"];

        // Ensure where is an array and construct parameterized conditions
        const whereClauses = [];
        const values = [];

        if (Array.isArray(body.where)) {
            body.where.forEach((condition, index) => {
                if (
                    typeof condition === "object" &&
                    condition.column &&
                    /^[a-zA-Z0-9_]+$/.test(condition.column) &&
                    allowedOperators.includes(condition.operator)
                ) {
                    whereClauses.push(`${condition.column} ${condition.operator} $${index + 1}`);
                    values.push(condition.value);
                }
            });
        }

        const where = whereClauses.length > 0 ? whereClauses.join(" AND ") : "1=1";
        const sql = `SELECT ${columns} FROM ${body.table} WHERE ${where}`;

        const results = await query(sql, values);
        return Response.json({ results }, { status: 200 });

    } catch (error) {
        console.error("Database query error:", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
