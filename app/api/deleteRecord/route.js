import { query } from "@/lib/database"; // Import database utility
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { table, primaryKey, primaryKeyColumn } = body;
    console.log("Table:", table, "Primary Key:", primaryKey, "Primary Key Column:", primaryKeyColumn)
    // Validate required fields
    if (!table || !primaryKey || !primaryKeyColumn) {
      return NextResponse.json(
        { message: "Table name, primary key column, and primary key value are required" },
        { status: 400 }
      );
    }


    // Execute the delete query safely
    const sql = `DELETE FROM ${table} WHERE ${primaryKey} = $1 RETURNING *`;
    const values = [primaryKeyColumn];
    const result = await query(sql, values);

    // Check if the record was deleted
    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Record deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json({ message: "Error deleting record", error: error.message }, { status: 500 });
  }
}
