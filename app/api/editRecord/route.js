// File: /app/api/editRecord/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/database'; // Import your SQL query function
import { tableSchemas } from '@/lib/Schema';

export async function PUT(request) {
  try {
    const body = await request.json();
    const { table, data, primaryKey } = body;

    // Validation
    if (!table || !data || !primaryKey || !primaryKey.field || primaryKey.value === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields: table, data, or primaryKey information' }, 
        { status: 400 }
      );
    }

    // Check if the table is valid
    const schema = tableSchemas[table];
    if (!schema) {
      return NextResponse.json(
        { message: `Invalid table: ${table}` }, 
        { status: 400 }
      );
    }

    // Filter out any fields that aren't in the schema and build SET clause
    const validFields = [];
    const values = [];
    const paramPlaceholders = [];
    let paramCounter = 1;

    for (const field of schema) {
      if (data[field.name] !== undefined && field.name !== primaryKey.field) {
        validFields.push(field.name);
        values.push(data[field.name]);
        paramPlaceholders.push(`$${paramCounter}`);
        paramCounter++;
      }
    }

    // If there's no data to update after validation
    if (validFields.length === 0) {
      return NextResponse.json(
        { message: 'No valid fields to update' }, 
        { status: 400 }
      );
    }

    // Construct the SET clause
    const setClause = validFields.map((field, index) => 
      `"${field}" = ${paramPlaceholders[index]}`
    ).join(', ');

    // Add primary key value to the values array
    values.push(primaryKey.value);

    // Construct the SQL update query with PostgreSQL-style parameters ($1, $2, etc.)
    const sql = `UPDATE "${table}" SET ${setClause} WHERE "${primaryKey.field}" = $${paramCounter}`;

    // Execute the SQL query
    const result = await query(sql, values);

    // Check if records were updated
    if (!result || result.length === 0) {
      // For PostgreSQL, we need to use a different approach to check for affected rows
      // We can modify the query to return the updated row
      const returningSql = `UPDATE "${table}" SET ${setClause} WHERE "${primaryKey.field}" = $${paramCounter} RETURNING *`;
      const returnResult = await query(returningSql, values);
      
      if (!returnResult || returnResult.length === 0) {
        return NextResponse.json(
          { message: `Record with ${primaryKey.field} = ${primaryKey.value} not found or no changes made` }, 
          { status: 404 }
        );
      }
    }

    // Return success response
    return NextResponse.json({
      message: 'Record updated successfully',
      table,
      updatedFields: validFields,
      primaryKey
    });

  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message }, 
      { status: 500 }
    );
  }
}