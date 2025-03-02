import { query } from "@/lib/database";

// Define table access permissions
const rolePermissions = {
    Admin: "*", // Admin can access all tables
    Panchayat_Employee: ["agri_records", "land_records","assets","census_data","environmental_data","households","scheme_beneficiaries","welfare_schemes"], 
    Citizen: ["households","assets","agri_records","scheme_beneficiaries","welfare_schemes","census_data","environmental_data"],
    Government_monitor: ["welfare_schemes","scheme_beneficiaries","census_data","environmental_data"],
};

export async function POST(req) {
    try {
        // Get user role from the request (Assuming it comes from headers)
        const { userRole } = await req.json(); // Modify as per your auth system
        console.log("ROLE : ", userRole);       
        if (!userRole || !rolePermissions[userRole]) {
            return Response.json({ message: "Unauthorized access" }, { status: 403 });
        }

        // Fetch all tables from PostgreSQL
        let sql = `SELECT * FROM tables;`;
        const results = await query(sql);
        console.log("Results : ", results);

        // Filter tables based on userRole permissions
        const allowedTables =
        rolePermissions[userRole] === "*" 
            ? results 
            : results.filter(table => rolePermissions[userRole].includes(table.name));    
        console.log("Allowed Tables : ", allowedTables);
        return Response.json({ tables: allowedTables }, { status: 200 });

    } catch (e) {
        console.error("Error in POST /api/fetchTables", e);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
