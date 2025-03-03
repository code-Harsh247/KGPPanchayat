import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function POST(req) {
    try {
        const { sql, limit = 25, page = 1 } = await req.json();
        console.log("SQL:", sql);

        // Ensure the query does not modify the database
        const forbiddenKeywords = ["INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "TRUNCATE"];
        const upperSql = sql.toUpperCase();

        if (forbiddenKeywords.some(keyword => upperSql.includes(keyword))) {
            return NextResponse.json({ success: false, message: "Only SELECT queries are allowed." }, { status: 400 });
        }

        // Extract table name dynamically (assuming a basic `FROM` pattern)
        const tableNameMatch = sql.match(/FROM\s+(\w+)/i);
        const tableName = tableNameMatch ? tableNameMatch[1] : null;

        // Get column names and types
        const columnsWithTypes = {};
        let columns = [];

        if (tableName) {
            const columnsQuery = `
                SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = $1
            `;
            const columnsResult = await query(columnsQuery, [tableName.toLowerCase()]);

            columnsResult.forEach(row => {
                columnsWithTypes[row.column_name] = row.data_type;
            });

            columns = columnsResult.map(row => row.column_name);
        }

        // Apply pagination
        const offset = (page - 1) * limit;
        const paginatedSQL = `${sql} LIMIT ${limit} OFFSET ${offset};`;
        console.log("PaginatedSQL: ", paginatedSQL);

        // Execute the query safely
        const result = await query(paginatedSQL, []);

        if (!result.length) {
            return NextResponse.json({ success: true, columns, columnsWithTypes, records: [] });
        }

        // Ensure column list is extracted from the result in case table detection fails
        if (!columns.length) {
            columns = Object.keys(result[0]);
        }

        return NextResponse.json({ success: true, columns, columnsWithTypes, records: result }, { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ success: false, message: "Database query failed." }, { status: 500 });
    }
}
