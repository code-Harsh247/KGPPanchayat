import { NextResponse } from "next/server";
import Together from "together-ai";
import fs from "fs/promises"; // Use fs.promises for async file reading

const together = new Together({ apiKey: process.env.TOGETHER_AI_KEY });

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    // Read schema from file
    let schema = `Schema Tables:
- agri_records.agri_land_id (integer)
- agri_records.land_id (integer)
- agri_records.crop_type (character varying)      
- agri_records.yield (integer)
- agri_records.season (character varying)
- agri_records.year (integer)

- assets.asset_id (integer)
- assets.name (character varying)
- assets.type (character varying)
- assets.location (character varying)
- assets.value (numeric)
- assets.purchase_date (date)
- assets.last_maintenance (date)

- census_data.census_id (integer)
- census_data.year (integer)
- census_data.births (integer)
- census_data.deaths (integer)
- census_data.marriages (integer)
- census_data.divorces (integer)
- census_data.male_population (integer)
- census_data.female_population (integer)
- census_data.total_population (integer)

- citizens.citizen_id (integer)
- citizens.user_id (integer)
- citizens.gender (character varying)
- citizens.date_of_birth (date)
- citizens.household_id (integer)
- citizens.occupation (character varying)
- citizens.education_level (character varying)    
- citizens.income (integer)

- environmental_data.env_id (integer)
- environmental_data.air_quality (numeric)        
- environmental_data.soil_quality (numeric)       
- environmental_data.water_quality (numeric)      
- environmental_data.tree_count (integer)
- environmental_data.year (integer)

- govtmonitors.monitor_id (integer)
- govtmonitors.user_id (integer)
- govtmonitors.jurisdiction (character varying)   

- households.household_id (integer)
- households.address (character varying)
- households.annual_income (integer)
- households.member_count (integer)

- land_records.land_id (integer)
- land_records.address (character varying)        
- land_records.size (numeric)
- land_records.citizen_id (integer)

- panchayat_employees.employee_id (integer)       
- panchayat_employees.citizen_id (integer)        
- panchayat_employees.role (character varying)    
- panchayat_employees.joining_date (date)

- scheme_beneficiaries.beneficiary_id (integer)   
- scheme_beneficiaries.citizen_id (integer)       
- scheme_beneficiaries.scheme_id (integer)        
- scheme_beneficiaries.enrollment_date (date)  

- tables.name (character varying)
- tables.title (character varying)
- tables.description (text)

- users.user_id (integer)
- users.name (character varying)
- users.role (character varying)
- users.phone_number (character varying)
- users.password_hash (text)

- welfare_schemes.scheme_id (integer)
- welfare_schemes.scheme_name (character varying) 
- welfare_schemes.description (text)
- welfare_schemes.budget (numeric)
- welfare_schemes.overseen_by (integer)


GIVE ONLY THE SQL COMMAND. DO NOT GIVE ME ANY TEXT. AND DO NOT PUT THE FINAL SEMICOLON IN YOUR SQL COMMAND. JUST THE SQL COMMAND. THANK YOU.`;

    // Prepare the full prompt with schema
    const fullPrompt = `You are an AI that converts text to SQL. Here is the database schema:\n${schema}\n\nUser request: ${prompt}`;

    // Create a streaming response from Together AI
    const stream = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [{ role: "user", content: fullPrompt }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
