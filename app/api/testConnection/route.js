import { query } from "@/lib/database";

// Define the GET route
export async function GET() {
    try {
        const result = await query('SELECT * FROM user;',[]); // Simple test query
        return new Response(JSON.stringify({ success: true, data: result }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Query failed', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
