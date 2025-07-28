const pool  = require("./api/database/db.js");

const testConnection  = async ()=>{
    try{
        const res = await pool.query('SELECT NOW()');
        console.log("Database Connected:",res.rows[0]);
    }
    catch(err){
        console.error('DB Connection err',err.message);
    }
    finally{
        await pool.end();
    }
}

testConnection();   