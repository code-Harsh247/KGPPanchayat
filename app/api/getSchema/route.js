import { NextResponse } from "next/server";
import { query } from "@/lib/database"; // Import your DB utility function

export async function GET() {
  try {
    const result = await query(
      `SELECT table_name, column_name, data_type
       FROM information_schema.columns
       WHERE table_schema = 'public'
       ORDER BY table_name, ordinal_position;`
    );

    // Format schema as a readable string
    let schema = "Tables:\n";
    result.forEach((row) => {
      schema += `- ${row.table_name}.${row.column_name} (${row.data_type})\n`;
    });
    console.log("Schema", schema);
    return NextResponse.json({ schema });
  } catch (error) {
    console.error("Error fetching schema:", error);
    return NextResponse.json({ error: "Failed to fetch schema" }, { status: 500 });
  }
}
