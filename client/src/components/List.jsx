import React from 'react'
import ListTable from './ListTable'
import { Box } from '@mui/material'


const List = ({employees,setSingleEmp,setEmployees}) => {
  return (
    <Box style={{
        marginTop:"6%",
        marginLeft:"5%",
        marginRight:"5%",
        width:"90%",
    }}>
    
    <ListTable setSingleEmp={setSingleEmp} employees={employees} setEmployees={setEmployees}/>
    </Box>
  )
}

export default List