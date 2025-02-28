import { query } from '@/lib/database';

export async function POST(req) {
    try {
        const body = await req.json();
        const table = body.table;

        if (!table) {
            return Response.json({ message: "Table name is required" }, { status: 400 });
        }

        // Use parameterized query
        const sql = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
        const result = await query(sql, [table.toLowerCase()]); 

        return Response.json({ result }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/getColumn", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
