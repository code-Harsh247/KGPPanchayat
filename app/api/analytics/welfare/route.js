import { query } from "@/lib/database";

export const GET = async () => {
    try {
        const sql = `
            SELECT ws.scheme_name AS name, 
                   COUNT(sb.beneficiary_id) AS beneficiaries,
                   SUM(ws.budget) AS budget
            FROM welfare_schemes ws
            LEFT JOIN scheme_beneficiaries sb ON ws.scheme_id = sb.scheme_id
            GROUP BY ws.scheme_id
            ORDER BY beneficiaries DESC;
        `;

        const result = await query(sql);

        // Ensure proper number formatting
        const formatNumber = (value) => Number(value) || 0;

        const welfareData = result.map(row => ({
            name: row.name,
            beneficiaries: formatNumber(row.beneficiaries),
            budget: formatNumber(row.budget)
        }));
        console.log(welfareData);
        return Response.json(welfareData, { status: 200 });
    } catch (error) {
        console.error("Error fetching welfare analytics:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};