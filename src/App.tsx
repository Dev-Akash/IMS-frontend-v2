import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import UserDashboard from './pages/dashboard/UserDashboard'
import LandingPage from './pages/LandingPage'
import LandingLayout from './layouts/LandingLayout'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Login from './pages/auth/Login'
import { Toaster } from 'sonner'
import Signup from './pages/auth/Signup'
import DashboardLayout from './layouts/DashboardLayout'
import Products from './pages/Products'
import Stocks from './pages/Stocks'
import Suppliers from './pages/Suppliers'
import Users from './pages/Users'
import AdminReports from './pages/Reports'
import Notifications from './pages/Notifications'
import CategoriesPage from './pages/Categories'
import WarehousesPage from './pages/Warehouses'
import { isAuthenticated } from './api/auth'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route element={<LandingLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/login" element={!isAuthenticated().user ? <Login /> : <Navigate to={isAuthenticated().user.role === 1 ? '/dashboard/admin' : '/dashboard/user'}/>} />
          <Route path="/signup" element={!isAuthenticated().user ? <Signup /> : <Navigate to={isAuthenticated().user.role === 1 ? '/dashboard/admin' : '/dashboard/user'}/>} />
        </Route>
        
        {/* Dashboards */}
        <Route path="/dashboard/*" element={isAuthenticated().user ? <DashboardLayout /> : <Navigate to={"/"}/>}>
          <Route path="user" element={<UserDashboard />}/>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="products" element={<Products/>} />
          <Route path="stocks" element={<Stocks/>} />
          <Route path="suppliers" element={<Suppliers/>} />
          <Route path="users" element={(isAuthenticated().user && isAuthenticated().user.role == 1) ? <Users/> : <Navigate to={"/"}/>} />
          <Route path="reports" element={(isAuthenticated().user && isAuthenticated().user.role == 1) ? <AdminReports/> : <Navigate to={"/"}/>} />
          <Route path="notifications" element={<Notifications/>} />
          <Route path="categories" element={<CategoriesPage/>} />
          <Route path="warehouses" element={<WarehousesPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </ThemeProvider>
  )
}

export default App
