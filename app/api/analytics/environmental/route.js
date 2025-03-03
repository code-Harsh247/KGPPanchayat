import { query } from "@/lib/database";

export const GET = async () => {
    try {
        const sql = `
            SELECT year, 
                   AVG(air_quality) AS air_quality, 
                   AVG(water_quality) AS water_quality, 
                   AVG(soil_quality) AS soil_quality,
                   SUM(tree_count) AS tree_count
            FROM environmental_data
            WHERE year >= (SELECT MAX(year) - 4 FROM environmental_data)
            GROUP BY year
            ORDER BY year ASC;
        `;

        const result = await query(sql);

        // Ensure all values are numbers
        const formatNumber = (value) => Number(value) || 0;

        // Separate environmental quality data and tree count data
        const environmentalData = result.map(row => ({
            year: formatNumber(row.year),
            air_quality: formatNumber(row.air_quality),
            water_quality: formatNumber(row.water_quality),
            soil_quality: formatNumber(row.soil_quality)
        }));

        const treeData = result.map(row => ({
            year: formatNumber(row.year),
            count: formatNumber(row.tree_count)
        }));

        // Calculate last 5 years' average metrics
        const totalYears = environmentalData.length;
        const avgAirQuality = environmentalData.reduce((sum, data) => sum + data.air_quality, 0) / totalYears;
        const avgWaterQuality = environmentalData.reduce((sum, data) => sum + data.water_quality, 0) / totalYears;
        const avgSoilQuality = environmentalData.reduce((sum, data) => sum + data.soil_quality, 0) / totalYears;

        // Calculate tree growth percentage over the last 5 years
        const firstYearTrees = treeData[0]?.count || 0;
        const lastYearTrees = treeData[treeData.length - 1]?.count || 0;
        const treeGrowthPercentage = firstYearTrees > 0 
            ? ((lastYearTrees - firstYearTrees) / firstYearTrees) * 100 
            : 0;

        return Response.json({ 
            environmentalData, 
            treeData,
            metrics: {
                avgAirQuality: parseFloat(avgAirQuality.toFixed(2)),
                avgWaterQuality: parseFloat(avgWaterQuality.toFixed(2)),
                avgSoilQuality: parseFloat(avgSoilQuality.toFixed(2)),
                treeGrowthPercentage: parseFloat(treeGrowthPercentage.toFixed(2))
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching environmental analytics:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
