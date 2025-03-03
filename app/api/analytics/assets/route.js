import { query } from "@/lib/database";

export const GET = async () => {
    try {
        const sql = `
            SELECT type, SUM(value) AS total_value, purchase_date
            FROM assets
            GROUP BY type, purchase_date;
        `;

        const result = await query(sql);

        // Initialize category counts
        const ageCategories = {
            "< 1 Year": 0,
            "1-3 Years": 0,
            "3-5 Years": 0,
            "5-10 Years": 0,
            "> 10 Years": 0
        };

        const assetValueData = {};

        const currentYear = new Date().getFullYear();

        // Process Data
        result.forEach(row => {
            const purchaseYear = new Date(row.purchase_date).getFullYear();
            const assetAge = currentYear - purchaseYear;

            // Categorize asset age
            if (assetAge < 1) ageCategories["< 1 Year"]++;
            else if (assetAge >= 1 && assetAge < 3) ageCategories["1-3 Years"]++;
            else if (assetAge >= 3 && assetAge < 5) ageCategories["3-5 Years"]++;
            else if (assetAge >= 5 && assetAge < 10) ageCategories["5-10 Years"]++;
            else ageCategories["> 10 Years"]++;

            // Sum total value per asset type
            if (!assetValueData[row.type]) {
                assetValueData[row.type] = 0;
            }
            assetValueData[row.type] += Number(row.total_value); // Ensure numeric values
        });

        // Format response
        const assetData = Object.keys(assetValueData).map(type => ({
            type,
            value: assetValueData[type]
        }));

        const assetAgeData = Object.keys(ageCategories).map(age => ({
            age,
            count: ageCategories[age]
        }));

        return Response.json({
            assetData,
            assetAgeData
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching assets analytics:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
