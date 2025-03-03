import { query } from "@/lib/database";

export const GET = async () => {
    try {
        // Query to fetch total yield per crop and total annual yield
        const sql1 = `
            SELECT crop_type AS crop, SUM(yield) AS yield
            FROM agri_records
            GROUP BY crop_type;
        `;

        const sql2 = `
            SELECT year, SUM(yield) AS yield
            FROM agri_records
            WHERE year >= (SELECT MAX(year) - 4 FROM agri_records)
            GROUP BY year
            ORDER BY year ASC;
        `

        const cropYieldResult = await query(sql1);
        const yearlyYieldResult = await query(sql2);

        // Ensure values are numbers
        const formatNumber = (value) => Number(value) || 0;

        // Format crop yield data
        const cropData = cropYieldResult.map(row => ({
            crop: row.crop,
            yield: formatNumber(row.yield)
        }));

        // Format yearly yield data
        const yieldData = yearlyYieldResult.map(row => ({
            year: formatNumber(row.year),
            yield: formatNumber(row.yield)
        }));

        // Compute last 5 years' average yield
        const totalYears = yieldData.length;
        const avgAnnualYield = yieldData.reduce((sum, data) => sum + data.yield, 0) / totalYears;

        // Compute yield growth percentage over the last 5 years
        const firstYearYield = yieldData[0]?.yield || 0;
        const lastYearYield = yieldData[yieldData.length - 1]?.yield || 0;
        const yieldGrowthPercentage = firstYearYield > 0
            ? ((lastYearYield - firstYearYield) / firstYearYield) * 100
            : 0;

        return Response.json({
            cropData,
            yieldData,
            metrics: {
                avgAnnualYield: parseFloat(avgAnnualYield.toFixed(2)),
                yieldGrowthPercentage: parseFloat(yieldGrowthPercentage.toFixed(2))
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching agriculture analytics:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
