const pool  = require("./api/database/db.js");



const createEmployeetable = async () =>{

    const tablequery = `
    CREATE TABLE IF NOT EXISTS employees(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        designation VARCHAR(100) NOT NULL,
        empid INTEGER NOT NULL UNIQUE
    );
    `

    try{
        await pool.query(tablequery);
        console.log("Employee table created");
    }   
    catch(err)
    {
        console.error("Error creating Employee table",err.message);
    }

}

createEmployeetable();