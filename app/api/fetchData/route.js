import { query } from "@/lib/database";

export async function POST(req) {
    try {
        const body = await req.json();
        const { table, page = 1, limit = 25, sort, order = "asc", filters = {} } = body;

        if (!table) {
            return Response.json({ message: "Table name is required" }, { status: 400 });
        }

        // Fetch column names and types dynamically
        const columnsQuery = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = $1
        `;
        const columnsResult = await query(columnsQuery, [table.toLowerCase()]);

        if (columnsResult.length === 0) {
            return Response.json({ message: "Table not found" }, { status: 404 });
        }

        const columnsWithTypes = {};
        const columns = columnsResult.map(row => {
            columnsWithTypes[row.column_name] = row.data_type; // Store column name and type
            return row.column_name;
        });

        // Build WHERE clause dynamically with relational operators
        const whereClauses = [];
        const values = [];
        let valueIndex = 1; // Track parameterized query index

        Object.entries(filters).forEach(([key, condition]) => {
            if (!columns.includes(key)) return; // Skip if column is invalid

            if (typeof condition === "object") {
                // Handle relational operators
                Object.entries(condition).forEach(([operator, value]) => {
                    let sqlOperator;
                    switch (operator) {
                        case "eq": sqlOperator = "="; break;
                        case "ne": sqlOperator = "!="; break;
                        case "gt": sqlOperator = ">"; break;
                        case "lt": sqlOperator = "<"; break;
                        case "gte": sqlOperator = ">="; break;
                        case "lte": sqlOperator = "<="; break;
                        case "like": sqlOperator = "LIKE"; value = `%${value}%`; break;
                        default: return; // Skip unsupported operators
                    }
                    whereClauses.push(`${key} ${sqlOperator} $${valueIndex}`);
                    values.push(value);
                    valueIndex++;
                });
            } else {
                // Handle direct equality filtering
                whereClauses.push(`${key} = $${valueIndex}`);
                values.push(condition);
                valueIndex++;
            }
        });

        const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

        // Sorting and Pagination
        const orderByColumn = columns.includes(sort) ? sort : columns[0];
        const orderDirection = order.toLowerCase() === "desc" ? "DESC" : "ASC";
        const offset = (page - 1) * limit;

        const recordsQuery = `
            SELECT ${columns.join(", ")}
            FROM ${table}
            ${whereClause}
            ORDER BY ${orderByColumn} ${orderDirection}
            LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
        `;

        values.push(limit, offset);
        const records = await query(recordsQuery, values);

        return Response.json({ columns, columnsWithTypes, records }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/getRecords", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
