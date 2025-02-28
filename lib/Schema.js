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
  };
  