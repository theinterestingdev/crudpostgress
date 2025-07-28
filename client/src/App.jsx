import React from 'react'
import List from './components/List'
import Header from './components/Header'
import AddEmp from './components/AddEmp'
import UpdateEmp from './components/UpdateEmp'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_BASE_URL

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [singleEmp,setSingleEmp] = useState({})
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${apiUrl}/viewemp`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <Box>
      <Header/>
      <Router>
        <Routes>
        <Route path="/" element={  <>
                <List setSingleEmp={setSingleEmp}  employees={employees} setEmployees={setEmployees} />
                <AddEmp onAdd={fetchEmployees} />
              </>}/>
        <Route path="/update" element={<UpdateEmp singleEmp={singleEmp} setEmployees={setEmployees}  onUpdate={fetchEmployees}/>}/>
        </Routes>
      </Router>
      
      
      
      
    </Box>
  )
}

export default App