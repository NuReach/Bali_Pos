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
import { ProtectedRoute } from '../src/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PDFPreview from './pages/User/PDFPreview'
import Search from './pages/User/Search'

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <Routes> 
        <Route element={<ProtectedRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/product/create" element={<ProductCreatePage />} />
          <Route path="/product/edit/:id" element={<ProductEditPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/create" element={<UserCreatePage />} />
          <Route path="/user/edit/:id" element={<UserEditPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/detail/:id" element={<HistoryDetail />} />
          <Route path="/PDFPreview" element={<PDFPreview />} />
          <Route path="/search/:search" element={<Search />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
    </>
  )
}

export default App
