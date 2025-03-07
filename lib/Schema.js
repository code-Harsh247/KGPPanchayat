export const tableSchemas = {
    users: [
      { name: "user_id", label: "User ID", type: "number", required: true },
      { name: "name", label: "Full Name", type: "text", required: true },
      { 
        name: "role", 
        label: "Role", 
        type: "select", 
        options: ["Citizen", "Panchayat Employee", "Government Monitor"], 
        required: true 
      },
      { name: "phone_number", label: "Phone Number", type: "text", required: true },
      { name: "password_hash", label: "Password", type: "password", required: true },
    ],
  
    citizens: [
      { name: "user_id", label: "User ID", type: "number", required: true },
      { 
        name: "gender", 
        label: "Gender", 
        type: "select", 
        options: ["Male", "Female", "Others"], 
        required: true 
      },
      { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
      { name: "household_id", label: "Household ID", type: "number", required: true },
      { name: "occupation", label: "Occupation", type: "text", required: false },
      { 
        name: "education_level", 
        label: "Education Level", 
        type: "select", 
        options: [
          "High School Diploma", "Bachelor's Degree", "Master's Degree", 
          "PhD", "Technical Certification", "None"
        ], 
        required: true 
      },
      { name: "income", label: "Annual Income", type: "number", required: false },
    ],
  
    govtmonitors: [
      { name: "user_id", label: "User ID", type: "number", required: true },
      { 
        name: "jurisdiction", 
        label: "Jurisdiction", 
        type: "select", 
        options: [
          "District", "Block", "Village", "Ward", "Taluka", 
          "Tehsil", "Subdivision", "Zone", "Cluster"
        ], 
        required: true 
      },
    ],
  
    households: [
      { name: "household_id", label: "Household ID", type: "number", required: true },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "annual_income", label: "Annual Income", type: "number", required: false },
      { name: "member_count", label: "Number of Members", type: "number", required: true },
    ],
  
    land_records: [
      { name: "land_id", label: "Land ID", type: "number", required: true },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "size", label: "Land Size (Acres)", type: "number", step: "0.01", required: true },
      { name: "citizen_id", label: "Citizen ID", type: "number", required: true },
    ],
  
    panchayat_employees: [
      { name: "employee_id", label: "Employee ID", type: "number", required: true },
      { name: "citizen_id", label: "Citizen ID", type: "number", required: true },
      { 
        name: "role", 
        label: "Role", 
        type: "select", 
        options: [
          "Sarpanch", "Panchayat Secretary", "Village Development Officer", 
          "Gram Rozgar Sahayak", "Panchayat Clerk", "Computer Operator"
        ], 
        required: true 
      },
      { name: "joining_date", label: "Joining Date", type: "date", required: true },
    ],

    assets: [
      {name: "asset_id", label: "Asset ID", type: "number", required: true},
      {name: "name", label: "Asset Name", type: "text", required: true},
      {name: "type", label: "Asset Type", type: "select", 
        options: ["Furniture", "Infrastructure", "Vehicle", "Building", "Equipment"],
        required: true},
      {name: "location", label: "Location", type: "text", required: true},
      {name: "value", label: "Value", type: "number", required: true},
      {name: "purchase_date", label: "Purchase Date", type: "date", required: true},
      {name: "last_maintenance",label: "Last Maintenance Date", type: "date", required: true},
    ],
  
    agri_records: [
      { name: "agri_land_id", label: "Agri Land ID", type: "number", required: true },
      { name: "land_id", label: "Land ID", type: "number", required: true },
      { name: "crop_type", 
        label: "Crop Type", 
        type: "select",
        options: ["rice", "peas", "carrots", "tomatoes", "lettuce", "wheat", "cabbage", "corn", "soyabeans", "potatoes"],    
        required: true },
      { 
        name: "season", 
        label: "Season", 
        type: "select", 
        options: ["Winter", "Summer", "Monsoon"], 
        required: true 
      },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "yield", label: "Yield (Quintals)", type: "number", step: "0.01", required: true },
    ],

    welfare_schemes: [
      {name: "scheme_id", label: "Scheme ID", type: "number", required: true},
      {name: "scheme_name", label: "Scheme Name", type: "text", required: true},
      {name: "description", label: "Description", type: "text", required: true},
      {name: "budget", label: "Budget", type: "number", required: true},
      {name: "overseen_by", label: "Overseen By", type: "number", required: true},
    ],

    scheme_beneficiaries: [
      {name: "beneficiary_id", label: "Beneficiary ID", type: "number", required: true},
      {name: "citizen_id", label: "Citizen ID", type: "number", required: true},
      {name: "scheme_id", label: "Scheme ID", type: "number", required: true},
      {name: "enrollment_date", label: "Date Enrolled", type: "date", required: true},
    ],

    census_data: [
      {name: "census_id", label: "Census ID", type: "number", required: true},
      {name: "year", label: "Year", type: "number", required: true},
      {name: "births", label: "Births", type: "number", required: true},
      {name: "deaths", label: "Deaths", type: "number", required: true},
      {name: "marriages", label: "Marriages", type: "number", required: true},
      {name: "divorces", label: "Divorces", type: "number", required: true},
      {name: "male_population",label:"Male Population", type: "number", required: true},
      {name:"female_population",label:"Female Population", type: "number", required: true},
    ],

    environmental_data: [
      {name: "env_id", label: "Environmental ID", type: "number", required: true},
      {name: "year", label: "Year", type: "number", required: true},
      {name: "air_quality", label: "Air Quality Index", type: "date", required: true},
      {name: "water_quality", label: "Water Quality Index", type: "date", required: true},
      {name: "soil_quality", label: "Soil Quality Index", type: "number", required: true},
      {name: "tree_count", label: "Tree Count", type: "number", required: true},
    ],


  };
  

  export const tablePrimaryKeys = {
    users: "user_id",
    citizens: "citizen_id",
    govtmonitors: "monitor_id",
    households: "household_id",
    land_records: "land_id",
    panchayat_employees: "employee_id",
    assets: "asset_id",
    agri_records: "agri_land_id",
    welfare_schemes: "scheme_id",
    scheme_beneficiaries: "beneficiary_id",
    census_data: "census_id",
    environmental_data: "env_id",
  }
