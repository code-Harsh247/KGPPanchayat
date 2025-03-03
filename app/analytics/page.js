'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

const Analytics = () => {

    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const title = searchParams.get('title');


    const [analyticsData, setAnalyticsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Color palette for charts
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    useEffect(() => {
        if (name) {
            fetchAnalyticsData();
        }
    }, [name]);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch the appropriate analytics data based on the table name
            switch (name) {
                case 'census_data':
                    await fetchCensusAnalytics();
                    break;
                case 'environmental_data':
                    await fetchEnvironmentalAnalytics();
                    break;
                case 'welfare_schemes':
                    await fetchWelfareAnalytics();
                    break;
                case 'agri_records':
                    await fetchAgricultureAnalytics();
                    break;
                case 'assets':
                    await fetchAssetsAnalytics();
                    break;
                default:
                    setError("Unknown table selected");
            }
        } catch (err) {
            console.error("Error fetching analytics data:", err);
            setError("Failed to fetch analytics data");
        }

        setLoading(false);
    };

    // Specific analytics fetching functions
    const fetchCensusAnalytics = async () => {
        try {
            const response1 = await axios.get("/api/analytics/census");
            const response2 = await axios.get("/api/analytics/censusMetrics");

            // Merge both responses
            const combinedData = {
                ...response1.data, // Census data
                ...response2.data  // Metrics data
            };

            setAnalyticsData(combinedData);
        } catch (error) {
            console.error("Error fetching census analytics:", error);
        }
    };


    const fetchEnvironmentalAnalytics = async () => {
        const response = await axios.get("/api/analytics/environmental");
        setAnalyticsData(response.data);
    };

    const fetchWelfareAnalytics = async () => {
        const response = await axios.get("/api/analytics/welfare");
        console.log(response.data);
        setAnalyticsData(response.data);
    };

    const fetchAgricultureAnalytics = async () => {
        const response = await axios.get("/api/analytics/agriculture");
        setAnalyticsData(response.data);
    };

    const fetchAssetsAnalytics = async () => {
        const response = await axios.get("/api/analytics/assets");
        setAnalyticsData(response.data);
    };

    // Render content based on table name
    const renderAnalyticsContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading analytics data...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
                    <p>{error}</p>
                    <p>Please try again or select a different table.</p>
                </div>
            );
        }

        switch (name) {
            case 'census_data':
                return renderCensusAnalytics();
            case 'environmental_data':
                return renderEnvironmentalAnalytics();
            case 'welfare_schemes':
                return renderWelfareAnalytics();
            case 'agri_records':
                return renderAgricultureAnalytics();
            case 'assets':
                return renderAssetsAnalytics();
            default:
                return (
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-yellow-700">
                        <p>Please select a valid table to view analytics.</p>
                    </div>
                );
        }
    };

    // Mock data - you would replace these with real data from your API
    const mockPopulationData = [
        { year: 2018, male: 3500, female: 3300, total: 6800 },
        { year: 2019, male: 3600, female: 3400, total: 7000 },
        { year: 2020, male: 3650, female: 3500, total: 7150 },
        { year: 2021, male: 3700, female: 3550, total: 7250 },
        { year: 2022, male: 3750, female: 3600, total: 7350 },
    ];

    const mockBirthDeathData = [
        { year: 2018, births: 120, deaths: 70 },
        { year: 2019, births: 135, deaths: 72 },
        { year: 2020, births: 115, deaths: 90 },
        { year: 2021, births: 125, deaths: 75 },
        { year: 2022, births: 130, deaths: 73 },
    ];

    const mockMarriageDivorceData = [
        { year: 2018, marriages: 85, divorces: 12 },
        { year: 2019, marriages: 90, divorces: 15 },
        { year: 2020, marriages: 70, divorces: 18 },
        { year: 2021, marriages: 88, divorces: 14 },
        { year: 2022, marriages: 92, divorces: 16 },
    ];

    const mockEnvironmentalData = [
        { year: 2018, air_quality: 75, water_quality: 82, soil_quality: 78 },
        { year: 2019, air_quality: 73, water_quality: 80, soil_quality: 79 },
        { year: 2020, air_quality: 78, water_quality: 83, soil_quality: 80 },
        { year: 2021, air_quality: 80, water_quality: 85, soil_quality: 82 },
        { year: 2022, air_quality: 82, water_quality: 84, soil_quality: 83 },
    ];

    const mockTreeData = [
        { year: 2018, count: 15000 },
        { year: 2019, count: 15500 },
        { year: 2020, count: 16200 },
        { year: 2021, count: 17000 },
        { year: 2022, count: 17500 },
    ];

    const mockWelfareData = [
        { name: "Education Scholarship", beneficiaries: 320, budget: 500000 },
        { name: "Healthcare Assistance", beneficiaries: 450, budget: 750000 },
        { name: "Farm Subsidy", beneficiaries: 280, budget: 600000 },
        { name: "Senior Citizen Support", beneficiaries: 190, budget: 350000 },
        { name: "Women Empowerment", beneficiaries: 230, budget: 450000 },
    ];

    const mockCropData = [
        { crop: "Rice", yield: 450 },
        { crop: "Wheat", yield: 380 },
        { crop: "Corn", yield: 320 },
        { crop: "Soyabeans", yield: 270 },
        { crop: "Potatoes", yield: 400 },
    ];

    const mockYieldData = [
        { year: 2018, yield: 1450 },
        { year: 2019, yield: 1520 },
        { year: 2020, yield: 1480 },
        { year: 2021, yield: 1550 },
        { year: 2022, yield: 1620 },
    ];

    const mockAssetData = [
        { type: "Furniture", value: 250000 },
        { type: "Infrastructure", value: 1200000 },
        { type: "Vehicle", value: 800000 },
        { type: "Building", value: 3500000 },
        { type: "Equipment", value: 650000 },
    ];

    // Render functions for each table
    const renderCensusAnalytics = () => {
        console.log(analyticsData);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Population Over Years</CardTitle>
                        <CardDescription>Male and Female population distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analyticsData.populationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="male" stroke="#0088FE" name="Male Population" />
                                <Line type="monotone" dataKey="female" stroke="#FF8042" name="Female Population" />
                                <Line type="monotone" dataKey="total" stroke="#00C49F" name="Total Population" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Birth & Death Trends</CardTitle>
                        <CardDescription>Yearly birth and death counts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analyticsData.birthDeathData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="births" stroke="#82ca9d" name="Births" />
                                <Line type="monotone" dataKey="deaths" stroke="#ff7782" name="Deaths" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Marriage & Divorce Rates</CardTitle>
                        <CardDescription>Yearly trends in marriages and divorces</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analyticsData.marriageDivorceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="marriages" stroke="#8884d8" name="Marriages" />
                                <Line type="monotone" dataKey="divorces" stroke="#ff7782" name="Divorces" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Population Growth Summary</CardTitle>
                        <CardDescription>Key demographic indicators</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-blue-700">{analyticsData.populationGrowthRate}%</h3>
                                <p className="text-sm text-blue-600">Population Growth rate % (Last 5 years)</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-green-700">{analyticsData.birthRate}</h3>
                                <p className="text-sm text-green-600">Births per 1000 people</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-purple-700">{analyticsData.deathRate}</h3>
                                <p className="text-sm text-purple-600">Deaths per 1000 people</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-orange-700">{analyticsData.marriageRate}</h3>
                                <p className="text-sm text-orange-600">Marriagess per 1000 people</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-orange-700">{analyticsData.divorceRate}</h3>
                                <p className="text-sm text-orange-600">Divorces per 1000 people</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderEnvironmentalAnalytics = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Environmental Quality Metrics</CardTitle>
                        <CardDescription>Air, Water & Soil Quality Trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockEnvironmentalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="air_quality" stroke="#8884d8" name="Air Quality Index" />
                                <Line type="monotone" dataKey="water_quality" stroke="#82ca9d" name="Water Quality Index" />
                                <Line type="monotone" dataKey="soil_quality" stroke="#ffc658" name="Soil Quality Index" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tree Count Trend</CardTitle>
                        <CardDescription>Annual tree population in the region</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockTreeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#00C49F" strokeWidth={2} name="Tree Count" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quality Metrics Comparison</CardTitle>
                        <CardDescription>Environmental quality indicators (2022)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[mockEnvironmentalData[mockEnvironmentalData.length - 1]]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="air_quality" fill="#8884d8" name="Air Quality" />
                                <Bar dataKey="water_quality" fill="#82ca9d" name="Water Quality" />
                                <Bar dataKey="soil_quality" fill="#ffc658" name="Soil Quality" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Environmental Summary</CardTitle>
                        <CardDescription>Key environmental indicators</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-blue-700">82</h3>
                                <p className="text-sm text-blue-600">Air Quality Index (2022)</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-green-700">17,500</h3>
                                <p className="text-sm text-green-600">Tree Count (2022)</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-purple-700">84</h3>
                                <p className="text-sm text-purple-600">Water Quality Index</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-orange-700">+16.7%</h3>
                                <p className="text-sm text-orange-600">Tree Growth (5 Years)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderWelfareAnalytics = () => {
        return (
            <div className="flex flex-col gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Most Subscribed Welfare Schemes</CardTitle>
                        <CardDescription>Distribution of beneficiaries across schemes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={450}>
                            <PieChart>
                                <Pie
                                    data={analyticsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="beneficiaries"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {analyticsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Budget vs Beneficiaries</CardTitle>
                        <CardDescription>Allocation of resources per scheme</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={450}>
                            <BarChart data={analyticsData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={120} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="budget" fill="#8884d8" name="Budget (₹)" />
                                <Bar dataKey="beneficiaries" fill="#82ca9d" name="Beneficiaries" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Welfare Scheme Performance Metrics</CardTitle>
                        <CardDescription>Key performance indicators for each scheme</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiaries</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost per Beneficiary</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization %</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {analyticsData.map((scheme, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scheme.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.beneficiaries}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{scheme.budget.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{Math.round(scheme.budget / scheme.beneficiaries).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(Math.random() * 30 + 70).toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderAgricultureAnalytics = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Crop Production by Type</CardTitle>
                        <CardDescription>Yield distribution by crop type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockCropData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="crop" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="yield" fill="#8884d8" name="Yield (Quintals)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Yield Trends Over Years</CardTitle>
                        <CardDescription>Annual agricultural production</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockYieldData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="yield" stroke="#82ca9d" strokeWidth={2} name="Total Yield (Quintals)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Crop Distribution</CardTitle>
                        <CardDescription>Share of different crops in total production</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={mockCropData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="yield"
                                    nameKey="crop"
                                    label={({ crop, percent }) => `${crop}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {mockCropData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Agriculture Summary</CardTitle>
                        <CardDescription>Key agricultural indicators</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-blue-700">1,620</h3>
                                <p className="text-sm text-blue-600">Total Yield (2022)</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-green-700">+11.7%</h3>
                                <p className="text-sm text-green-600">Yield Growth (5 Years)</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-purple-700">Rice</h3>
                                <p className="text-sm text-purple-600">Highest Yielding Crop</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-md">
                                <h3 className="text-xl font-bold text-orange-700">5</h3>
                                <p className="text-sm text-orange-600">Major Crops Cultivated</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderAssetsAnalytics = () => {
        console.log(analyticsData);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Asset Distribution by Type</CardTitle>
                        <CardDescription>Value distribution across asset categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analyticsData.assetData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" name="Value (₹)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Asset Value Distribution</CardTitle>
                        <CardDescription>Percentage breakdown by asset type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analyticsData.assetData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="type"
                                    label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {mockAssetData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Assets Age Analysis</CardTitle>
                        <CardDescription>Distribution of assets by age</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analyticsData.assetAgeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#82ca9d" name="Number of Assets" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <div className="w-3/4 font-Crimson mx-auto py-8 px-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-800">{title || name} Analytics</h1>
                    <p className="text-gray-500 mt-2">Detailed analysis and visualizations</p>
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full md:w-auto flex flex-wrap gap-2 justify-center md:justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {name === "census_data" && <TabsTrigger value="demographics">Demographics</TabsTrigger>}
                    {name === "environmental_data" && <TabsTrigger value="trends">Trends</TabsTrigger>}
                    {name === "welfare_schemes" && <TabsTrigger value="impact">Impact</TabsTrigger>}
                    {name === "agri_records" && <TabsTrigger value="production">Production</TabsTrigger>}
                    {name === "assets" && <TabsTrigger value="valuation">AI Evaluation</TabsTrigger>}
                </TabsList>

                {/* Tab Content */}
                <TabsContent value="overview" className="mt-6">
                    {renderAnalyticsContent()}
                </TabsContent>

                {[
                    { key: "census_data", value: "demographics", color: "blue", label: "Detailed demographic analysis will be available in the next release." },
                    { key: "environmental_data", value: "trends", color: "green", label: "Detailed environmental trend analysis will be available in the next release." },
                    { key: "welfare_schemes", value: "impact", color: "purple", label: "Detailed welfare impact analysis will be available in the next release." },
                    { key: "agri_records", value: "production", color: "yellow", label: "Detailed agricultural production analysis will be available in the next release." },
                    { key: "assets", value: "valuation", color: "orange", label: "Detailed asset valuation analysis will be available in the next release." },
                ].map(({ key, value, color, label }) => (
                    name === key && (
                        <TabsContent key={value} value={value}>
                            <div className={`bg-${color}-50 p-5 mt-6 rounded-lg border border-${color}-200 text-${color}-700 shadow-sm`}>
                                <p>{label}</p>
                            </div>
                        </TabsContent>
                    )
                ))}
            </Tabs>
        </div>
    );
};

export default Analytics;
