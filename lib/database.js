// import { Pool } from 'pg';

// const pool = new Pool({
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE,
// });

// export {pool};

// export async function query(text, params) {
//     const client = await pool.connect();
//     try {
//         const result = await client.query(text, params);
//         return result.rows;
//     } catch (error) {
//         throw error;
//     } finally {
//         client.release();
//     }
// }

"use server";
import { neon } from "@neondatabase/serverless";

export async function query(query, values = []) {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const data = await sql(query, values);
        return data;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Failed to execute query");
    }
}
