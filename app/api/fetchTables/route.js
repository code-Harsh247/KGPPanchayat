import { query } from "@/lib/database";
//FOR FETCHING ALL TABLES IN THE DATABASE
export async function POST(){
    try{
        let sql = "SELECT * FROM tables;";
        const results = await query(sql);
        // console.log(results);
        return Response.json({ results }, { status: 200 });

    }catch(e){
        console.log("Error in POST /api/fetchTables", e);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}