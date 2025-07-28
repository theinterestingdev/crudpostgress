import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'



const AddButton = () => {
  return (
    <Box><Link to="/add"><Button style={{padding:"5px",color:"black",marginBottom:"10px "}}>Add Employee</Button></Link></Box>
  )
}

export default AddButton