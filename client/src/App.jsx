import React from 'react'
import List from './components/List'
import Header from './components/Header'
import AddEmp from './components/AddEmp'
import UpdateEmp from './components/UpdateEmp'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Box } from '@mui/material'
import { useState } from 'react'


const App = () => {
  const [singleEmp,setSingleEmp] = useState({})
  return (
    <Box>
      <Header/>
      <Router>
        <Routes>
        <Route path="/" element={<List setSingleEmp={setSingleEmp}/>}/>
        <Route path="/update" element={<UpdateEmp singleEmp={singleEmp}/>}/>
        <Route path="/add" element={<AddEmp/>}/>
        </Routes>
      </Router>
      
      
      
    </Box>
  )
}

export default App