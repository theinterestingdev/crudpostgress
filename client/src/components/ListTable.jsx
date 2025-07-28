import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios'



const ListTable = ({setSingleEmp}) => {

 const[employees,setEmployees] = useState([]);

 useEffect(()=>{

    const fetchData = async ()=>{

        const response = await axios.get(`http://localhost:8080/api/viewemp`)
        setEmployees(response.data);    
    }

    fetchData();

 },[]) // works when the data is rendered for the first time  // for that [] empty array is used

 const editHandler = (emp)=>{
    setSingleEmp(emp)
 }

 const deleteHandler= async(emp)=>{
    const res = await axios.delete(`http://localhost:8080/api/deleteemp/${emp.empid}`);
    const response  = await axios.get(`http://localhost:8080/api/viewemp`);
    setEmployees(response.data);
 }

  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow style={{background:"rgb(29,69,107)"}}>
                    <TableCell style={{color:"white"}}>Name</TableCell>
                    <TableCell style={{color:"white"}}>Email</TableCell>
                    <TableCell style={{color:"white"}}>Designation</TableCell>
                    <TableCell style={{color:"white"}}>empId</TableCell>
                    <TableCell style={{color:"white"}}>update</TableCell>
                    <TableCell style={{color:"white"}}>delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                employees.map((emp)=>(
                    <TableRow key ={emp.empid}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>{emp.empid}</TableCell>
                    <TableCell><Link to="/update"><EditIcon onClick={()=>editHandler(emp)}/></Link></TableCell>
                    <TableCell><DeleteIcon onClick={()=>deleteHandler(emp)}/></TableCell>
                    </TableRow>
                ))

            }
                
            </TableBody>
            
        </Table>
    </TableContainer>
  )
}

export default ListTable
