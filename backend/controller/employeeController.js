import pool from "../database/db.js";

const isValidEmail  = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}


const getEmployeesController = async(req,res)=>{

    const view = "SELECT * FROM employees";

    try{
        const result = await pool.query(view);
        const rows = result.rows;

        if(rows.length > 0)
        {
            return res.status(200).json(rows);
        }
        return res.status(404).json({ message: "No employees found" });


    }catch(e){
        console.error("Error fetching employees :",e);
        return res.status(500).json({message : "Internal server error"});
    }
    
    

}

const addEmployeesController = async (req,res)=>{

        const{ name,email,designation,empid } = req.body;

        if(!name || !email || !designation || !empid)
        {
            return res.status(400).json({error : "Missing Required Files"});
        }

        if(!isValidEmail(email))
        {
            return res.status(400).json({error : "Invalid Email"});
        }


    try{

        const checkempid = await pool.query('SELECT * FROM EMPLOYEES WHERE empid = $1',[empid]);

        if(checkempid.rows.length>0)
        {
            return res.status(409).json({message : "Employee with this empid already exists"});
        }

        const checkemail = await pool.query('SELECT * FROM EMPLOYEES WHERE email = $1',[email]);

        if(checkemail.rows.length>0)
        {
            return res.status(409).json({message : "Employee with this email already exists"});
        }


        await pool.query(
            'INSERT INTO employees (name, email, designation, empid) VALUES ($1, $2, $3, $4)',
            [name, email, designation, empid]
        );

        return res.status(201).json({ message: "Employee added successfully" });
   
    }   
    catch(e)
    {
        console.error("Update error :",e);
        res.status(500).json({message : "Internal server error"});  
    }

}

const updateEmployeesController = async (req,res)=>{
    
    const { empid } = req.params;


    const {name,email,designation} = req.body;

    if(!name && !email  && !designation)
    {
        return res.status(400).json({error : "Provide atleast one field to update"});
    }

    try{
        const checkEmp = await pool.query("SELECT * FROM Employees WHERE empid = $1",[empid]);

        if(checkEmp.rows.length===0)
        {
            return res.status(400).json({message:"Employee not found"});
        }

        const current = checkEmp.rows[0];
        const updatedName = name || current.name;
        const updatedEmail = email || current.email;
        const updatedDesignation = designation || current.designation;

        if(!isValidEmail(updatedEmail))
        {
            return res.status(400).json({message : "Invalid Email"});
        }
            

        await pool.query('UPDATE employees SET name = $1, email = $2, designation = $3 WHERE empid = $4',[updatedName,updatedEmail,updatedDesignation,empid]);

        res.status(200).json({message:"Employee updated successfully"});
    
    }
    catch(e)
    {
        console.error("Internal error :",e)
        res.status(500).json({message:"Internal server error"})
    }



}

const deleteEmployeesController = async(req,res)=>{
    const {empid} = req.params;
    try{
        const checkEmp = await pool.query("SELECT * FROM Employees WHERE empid = $1",[empid]);
        if(checkEmp.rows.length===0)
        {
            return res.status(400).json({message:"Employee not found"});
        }
        const empIdNum = parseInt(req.params.empid);
        if (isNaN(empIdNum)) return res.status(400).json({ message: "Invalid empid" });

        await pool.query("DELETE FROM employees WHERE empid = $1", [empIdNum]);
        return res.status(200).json({ message: "Employee deleted successfully" }); 


    }
    catch(e)
    {
        console.error("Internal error :",e)
        res.status(500).json({message:"Internal server error"})
    }

}


const employeeController = {
    addEmployeesController,
    getEmployeesController,
    updateEmployeesController,
    deleteEmployeesController
};

export default employeeController;