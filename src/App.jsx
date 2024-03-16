import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home'
import Receipt from './pages/Components/Receipt'
import DashboardPage from './pages/User/DashboardPage'
import ProductPage from './pages/User/ProductPage'
import UserPage from './pages/User/UserPage'
import HistoryPage from './pages/User/HistoryPage'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
