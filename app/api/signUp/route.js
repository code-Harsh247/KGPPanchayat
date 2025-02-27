// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { query, pool } from '@/lib/database'; // Adjust path according to your project structure
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, 
      role, 
      phone_number, 
      password,
      // Citizen fields
      gender, 
      date_of_birth, 
      household_id, 
      occupation, 
      education_level, 
      income,
      // Panchayat employee fields 
      employee_role,
      joining_date,
      // Govt monitor fields
      jurisdiction
    } = body;

    // Validate required fields
    if (!name || !role || !phone_number || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['Citizen', 'Panchayat_Employee', 'Admin', 'Government_monitor'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user with same phone number already exists
    const existingUsers = await query(
      'SELECT * FROM Users WHERE phone_number = $1',
      [phone_number]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'User with this phone number already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Begin transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert into User table
      const userResult = await client.query(
        'INSERT INTO Users (name, role, phone_number, password_hash) VALUES ($1, $2, $3, $4) RETURNING user_id',
        [name, role, phone_number, password_hash]
      );
      
      const user_id = userResult.rows[0].user_id;
      
      // Handle role-specific data
      if (role === 'Citizen') {
        // Validate required citizen fields
        if (!gender || !date_of_birth) {
          await client.query('ROLLBACK');
          return NextResponse.json(
            { error: 'Missing required citizen fields' },
            { status: 400 }
          );
        }
        
        // Insert into Citizen table
        await client.query(
          'INSERT INTO Citizens (user_id, gender, date_of_birth, household_id, occupation, education_level, income) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [user_id, gender, date_of_birth, household_id || null, occupation || null, education_level || null, income || null]
        );
      } 
      else if (role === 'Panchayat_Employee') {
        // Validate required employee fields
        if (!employee_role || !joining_date) {
          await client.query('ROLLBACK');
          return NextResponse.json(
            { error: 'Missing required employee fields' },
            { status: 400 }
          );
        }
        
        // First create a citizen entry (employees are citizens too)
        if (!gender || !date_of_birth) {
          await client.query('ROLLBACK');
          return NextResponse.json(
            { error: 'Panchayat employees must provide citizen details' },
            { status: 400 }
          );
        }
        
        const citizenResult = await client.query(
          'INSERT INTO Citizens (user_id, gender, date_of_birth, household_id, occupation, education_level, income) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING citizen_id',
          [user_id, gender, date_of_birth, household_id || null, occupation || null, education_level || null, income || null]
        );
        
        const citizen_id = citizenResult.rows[0].citizen_id;
        
        // Insert into panchayat_employees table
        await client.query(
          'INSERT INTO panchayat_employees (citizen_id, role, joining_date) VALUES ($1, $2, $3)',
          [citizen_id, employee_role, joining_date]
        );
      }
      else if (role === 'Government_monitor') {
        // Validate required monitor fields
        if (!jurisdiction) {
          await client.query('ROLLBACK');
          return NextResponse.json(
            { error: 'Missing required government monitor fields' },
            { status: 400 }
          );
        }
        
        // Insert into govtMonitor table
        await client.query(
          'INSERT INTO govtMonitors (user_id, jurisdiction) VALUES ($1, $2)',
          [user_id, jurisdiction]
        );
      }
      // Admin role doesn't need additional tables
      
      await client.query('COMMIT');
      
      return NextResponse.json(
        { 
          message: 'User created successfully',
          user_id: user_id
        },
        { status: 201 }
      );
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Transaction error:', error);
      
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Server error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}