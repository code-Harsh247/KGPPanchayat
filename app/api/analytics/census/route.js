import { query } from "@/lib/database";

export const GET = async () => {
    try {
        const sql = `
            SELECT year, 
                   SUM(male_population) AS male, 
                   SUM(female_population) AS female, 
                   SUM(male_population) + SUM(female_population) AS total,
                   SUM(births) AS births,
                   SUM(deaths) AS deaths,
                   SUM(marriages) AS marriages,
                   SUM(divorces) AS divorces
            FROM census_data
            GROUP BY year
            ORDER BY year ASC;
        `;

        const result = await query(sql);

        // Ensure all values are numbers
        const formatNumber = (value) => Number(value) || 0;

        // Split data into different categories
        const populationData = result.map(row => ({
            year: formatNumber(row.year),
            male: formatNumber(row.male),
            female: formatNumber(row.female),
            total: formatNumber(row.total)
        }));

        const birthDeathData = result.map(row => ({
            year: formatNumber(row.year),
            births: formatNumber(row.births),
            deaths: formatNumber(row.deaths)
        }));

        const marriageDivorceData = result.map(row => ({
            year: formatNumber(row.year),
            marriages: formatNumber(row.marriages),
            divorces: formatNumber(row.divorces)
        }));

        return Response.json({
            populationData,
            birthDeathData,
            marriageDivorceData
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching census analytics:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
