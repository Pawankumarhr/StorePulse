import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { Navbar } from './components/Navbar'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { ChangePassword } from './pages/auth/ChangePassword'
import { PublicPage, ShellPage, UnauthorizedPage } from './pages/ShellPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { UsersList } from './pages/admin/UsersList'
import { StoresList } from './pages/admin/StoresList'
import { UserDetail } from './pages/admin/UserDetail'
import { StoresList as UserStoresList } from './pages/user/StoresList'
import { OwnerDashboard } from './pages/store-owner/OwnerDashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<ShellPage />} />
          <Route path="/app/security" element={<ChangePassword />} />
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/app/admin" element={<AdminDashboard />} />
            <Route path="/app/admin/users" element={<UsersList />} />
            <Route path="/app/admin/users/:id" element={<UserDetail />} />
            <Route path="/app/admin/stores" element={<StoresList />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['NORMAL_USER']} />}>
            <Route path="/app/stores" element={<UserStoresList />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['STORE_OWNER']} />}>
            <Route path="/app/owner" element={<OwnerDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
