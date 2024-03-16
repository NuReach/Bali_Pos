import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home'
import Receipt from './pages/Components/Receipt'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
