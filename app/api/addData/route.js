import { query } from '@/lib/database';

const adduser = async function POST(req) {
    try {
        const body = await req.json();
        const table = body.table;
        const id = body.user_id;
        const name = body.name;
        const role = body.role;
        const phone_number = body.phone_number;
        const pass = body.password_hash;

        if (!table) {
            return Response.json({ message: "Table name is required" }, { status: 400 });
        }

        // Manually interpolate table name (unsafe for user input, must be validated)
        const sql = `INSERT INTO users (user_id, name, role, phone_number, password_hash) VALUES ($1, $2, $3, $4, $5)`;

        let result = await query(sql, [id, name, role, phone_number, pass]);

        return Response.json({ result }, { status: 200 });

    } catch (error) {
        console.error("Error in POST /api/addData", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}





const addCitizens = async function POST(req) {
    try {
        const body = await req.json();
        const table = body.table;
        const citizen_id = body.citizen_id;
        const user_id = body.user_id;
        const gender = body.gender;
        const date_of_birth = body.date_of_birth;
        const household_id = body.household_id;
        const occupation = body.occupation;
        const education_level = body.education_level;
        const income = body.income;

        // Validate table name
        if (!table || table.toLowerCase() !== "citizens") {
            return Response.json({ message: "Invalid table name" }, { status: 400 });
        }

        // Validate required fields
        if (!citizen_id || !user_id || !gender || !date_of_birth || !household_id) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // SQL Query
        const sql = `
            INSERT INTO citizens (citizen_id, user_id, gender, date_of_birth, household_id, occupation, education_level, income)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        // Execute Query
        let result = await query(sql, [
            citizen_id,
            user_id,
            gender,
            date_of_birth,
            household_id,
            occupation,
            education_level,
            income
        ]);

        return Response.json({ result }, { status: 200 });

    } catch (error) {
        console.error("Error in POST /api/addCitizen", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}


const addgovtmoniters = async function POST(req) {
    try {
        const body = await req.json();
        const {table,monitor_id, user_id, jurisdiction } = body;

        // Validate input
        if (!user_id || !jurisdiction) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        const sql = `INSERT INTO govtmonitors (monitor_id,user_id, jurisdiction) VALUES ($1, $2,$3)`;
        const result = await query(sql, [monitor_id,user_id, jurisdiction]);

        return Response.json({ message: "Monitor added successfully", monitor: result[0] }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/govtMonitors", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}


const addpanchayat_employee= async function POST(req) {
    try {
        const body = await req.json();
        const { employee_id,citizen_id, role, joining_date } = body;

        // Validate input
        if (!citizen_id || !role || !joining_date) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        const sql = `INSERT INTO panchayat_employees (employee_id,citizen_id, role, joining_date) VALUES ($1, $2, $3,$4)`;
        const result = await query(sql, [employee_id,citizen_id, role, joining_date]);

        return Response.json({ message: "Employee added successfully", employee: result[0] }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/employees", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}




const addassets=  async function POST(req) {
    try {
        const body = await req.json();
        const { asset_id, name, type, location, value, purchase_date, last_maintenance } = body;

        // Validate input
        if (!name || !type || !location || !value || !purchase_date || !last_maintenance) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        const sql = `INSERT INTO assets (asset_id, name, type, location, value, purchase_date, last_maintenance) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const result = await query(sql, [asset_id, name, type, location, value, purchase_date, last_maintenance]);

        return Response.json({ message: "Asset added successfully", asset: result[0] }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/assets", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}


const addagri_records =  async function POST(req) {
    try {
        const body = await req.json();
        const { agri_land_id, land_id, crop_type, crop_yield, season, year } = body;

        // Validate input
        if (!land_id || !crop_type || !crop_yield || !season || !year) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        const sql = `INSERT INTO agri_records (agri_land_id, land_id, crop_type, yield, season, year) 
                     VALUES ($1, $2, $3, $4, $5, $6)`;
        const result = await query(sql, [agri_land_id, land_id, crop_type, crop_yield, season, year]);

        return Response.json({ message: "Agricultural record added successfully", record: result[0] }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/agri_records", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}

const addhousehold= async function POST(req) {
    try {
        const body = await req.json();
        const { household_id, address, annual_income, member_count } = body;

        // Validate input
        if (!address || !annual_income || !member_count) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        const sql = `INSERT INTO households (household_id, address, annual_income, member_count) 
                     VALUES ($1, $2, $3, $4)`;
        const result = await query(sql, [household_id, address, annual_income, member_count]);

        return Response.json({ message: "Household record added successfully", record: result[0] }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/households", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}



const addscheme_beneficiaries= async function POST(req) {
    try {
        const body = await req.json();
        const { beneficiary_id, citizen_id, scheme_id, enrollment_date } = body;

        // Validate input
        if (!citizen_id || !scheme_id || !enrollment_date) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        const sql = `INSERT INTO scheme_beneficiaries (beneficiary_id, citizen_id, scheme_id, enrollment_date) 
                     VALUES ($1, $2, $3, $4)`;
        const result = await query(sql, [beneficiary_id, citizen_id, scheme_id, enrollment_date]);

        return Response.json({ message: "Beneficiary record added successfully", record: result[0] }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/beneficiaries", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}



const addwelfare_schemes = async function POST(req) {
    try {
        const body = await req.json();
        const { scheme_id, scheme_name, description, budget, overseen_by } = body;

        if (!scheme_name || !description || !budget || !overseen_by) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        const sql = `INSERT INTO welfare_schemes (scheme_id, scheme_name, description, budget, overseen_by) 
                     VALUES ($1, $2, $3, $4, $5)`;
        await query(sql, [scheme_id, scheme_name, description, budget, overseen_by]);

        return Response.json({ message: "Welfare scheme added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/welfare_schemes", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}


const addland_records =  async function POST(req) {
    try {
        const body = await req.json();
        const { land_id, address, size, citizen_id } = body;

        if (!land_id || !address || !size || !citizen_id) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        const sql = `INSERT INTO land_records (land_id, address, size, citizen_id) 
                     VALUES ($1, $2, $3, $4)`;
        await query(sql, [land_id, address, size, citizen_id]);

        return Response.json({ message: "Land record added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/land_records", error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}






export {adduser, addCitizens, addgovtmoniters,addpanchayat_employee,addassets,addagri_records,addhousehold,addscheme_beneficiaries,addwelfare_schemes,addland_records};