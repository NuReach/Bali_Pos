import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home'
import Receipt from './pages/Components/Receipt'
import DashboardPage from './pages/User/DashboardPage'
import ProductPage from './pages/User/ProductPage'
import UserPage from './pages/User/UserPage'
import HistoryPage from './pages/User/HistoryPage'
import ProductCreatePage from './pages/User/ProductCreatePage'
import ProductEditPage from './pages/User/ProductEditPage'
import Login from './pages/User/Login'
import UserCreatePage from './pages/User/UserCreatePage'
import UserEditPage from './pages/User/UserEditPage'
import HistoryDetail from './pages/User/HistoryDetail'
import { useEffect } from 'react'
import { toast } from 'sonner'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/create" element={<ProductCreatePage />} />
        <Route path="/product/edit/:id" element={<ProductEditPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/create" element={<UserCreatePage />} />
        <Route path="/user/edit/:id" element={<UserEditPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/detail/:id" element={<HistoryDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
