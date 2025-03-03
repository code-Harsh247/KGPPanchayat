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
            ORDER BY year DESC
            LIMIT 5; -- Get only the last 5 years
        `;

        const result = await query(sql);

        // Ensure all values are numbers
        const formatNumber = (value) => Number(value) || 0;

        // Process data
        const processedData = result.map(row => ({
            year: formatNumber(row.year),
            male: formatNumber(row.male),
            female: formatNumber(row.female),
            total: formatNumber(row.total),
            births: formatNumber(row.births),
            deaths: formatNumber(row.deaths),
            marriages: formatNumber(row.marriages),
            divorces: formatNumber(row.divorces),
        })).reverse(); // Reverse to have oldest year first

        // Calculate averages over the last 5 years
        const totalPopulation = processedData.reduce((sum, row) => sum + row.total, 0) / processedData.length;
        const totalBirths = processedData.reduce((sum, row) => sum + row.births, 0) / processedData.length;
        const totalDeaths = processedData.reduce((sum, row) => sum + row.deaths, 0) / processedData.length;
        const totalMarriages = processedData.reduce((sum, row) => sum + row.marriages, 0) / processedData.length;
        const totalDivorces = processedData.reduce((sum, row) => sum + row.divorces, 0) / processedData.length;

        // Calculate percentage growth based on first and last year
        const initialPopulation = processedData[0]?.total || 1;
        const finalPopulation = processedData[processedData.length - 1]?.total || 1;
        const populationGrowthRate = ((finalPopulation - initialPopulation) / initialPopulation) * 100;

        const birthRate = (totalBirths / totalPopulation) * 1000;
        const deathRate = (totalDeaths / totalPopulation) * 1000;
        const marriageRate = (totalMarriages / totalPopulation) * 1000;
        const divorceRate = (totalDivorces / totalPopulation) * 1000;

        return Response.json({
            populationGrowthRate: Number(populationGrowthRate.toFixed(2)),
            birthRate: Number(birthRate.toFixed(2)),
            deathRate: Number(deathRate.toFixed(2)),
            marriageRate: Number(marriageRate.toFixed(2)),
            divorceRate: Number(divorceRate.toFixed(2)),
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching census analytics:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
