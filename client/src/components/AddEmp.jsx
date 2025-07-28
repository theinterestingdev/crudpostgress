  import React from 'react'
  import { Box, TextField,Button } from '@mui/material'
  import { useState } from 'react'

  import axios from 'axios'

  const apiUrl = import.meta.env.VITE_API_BASE_URL


  const init ={
      name :"",
      email:"",
      designation:"",
      empid:"",
  }

  const AddEmp = ({onAdd}) => {

      const [emp,setEmp] = useState(init)

      const inputHandler = (e)=>{
          
          setEmp({...emp,[e.target.name]:e.target.value})
          
      }

      
      const submitHandler = async (e)=>{
          
          try{
            await axios.post(`${apiUrl}/addemp`,emp);
            onAdd();
          }
          catch(e)
          {
            alert("Error in input, Check your input again");
          }
          
      }

    return (
      <Box style={{marginTop:"1%",marginLeft:"35%",width:"30%",display:"flex",flexDirection:"column"}}>

      <TextField label="Name" name="name" variant='outlined' style={{margin:"4px"}} onChange={inputHandler} />
      <TextField label="Email" name="email" variant='outlined' style={{margin:"4px"}} onChange={inputHandler} />
      <TextField label="Designation" name="designation" variant='outlined' style={{margin:"4px"}} onChange={inputHandler} />
      <TextField label="EmpId" name="empid" variant='outlined' style={{margin:"4px"}} onChange={inputHandler} />
      <Button style={{margin:"10px",background:"rgb(29,69,107)",color:"white"}} onClick = {submitHandler}>Add Employee</Button>



      </Box>

    )
  }



  export default AddEmp