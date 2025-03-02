// File: /app/api/getMaxId/route.js
import { NextResponse } from "next/server";
import { pool } from "@/lib/database"; 

export async function POST(request) {
  try {
    const body = await request.json();
    const { tableName } = body;

    if (!tableName) {
      return NextResponse.json(
        { error: "Table name is required" },
        { status: 400 }
      );
    }

    // First, get the primary key column name for the table
    const primaryKeyQuery = `
      SELECT kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_name = $1
    `;
    const primaryKeyResult = await pool.query(primaryKeyQuery, [tableName]);
    
    if (primaryKeyResult.rows.length === 0) {
      return NextResponse.json(
        { error: "No primary key found for this table" },
        { status: 400 }
      );
    }
    
    const primaryKeyColumn = primaryKeyResult.rows[0].column_name;
    
    // Now get the max value of the primary key
    const maxValueQuery = `
      SELECT COALESCE(MAX(${primaryKeyColumn}), 0) as max_id
      FROM ${tableName}
    `;
    
    const maxValueResult = await pool.query(maxValueQuery);
    const maxId = maxValueResult.rows[0].max_id;
    
    // Return the max ID and next ID (max + 1)
    return NextResponse.json({ 
      maxId: maxId,
      nextId: maxId + 1, 
      primaryKeyColumn 
    });
    
  } catch (error) {
    console.error("Error getting max ID:", error);
    return NextResponse.json(
      { error: "Failed to get max ID: " + error.message },
      { status: 500 }
    );
  }
}