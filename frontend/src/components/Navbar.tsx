import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const roleLabels = {
  ADMIN: 'Administrator',
  NORMAL_USER: 'Customer',
  STORE_OWNER: 'Store owner',
} as const

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link className="wordmark" to={isAuthenticated ? '/app' : '/'}>
        <span className="wordmark-mark">SP</span>
        <span>StorePulse</span>
      </Link>
      {isAuthenticated && user ? (
        <div className="nav-actions">
          <nav aria-label="Primary navigation">
            <NavLink to="/app" end>Overview</NavLink>
            {user.role === 'ADMIN' && <><NavLink to="/app/admin">Dashboard</NavLink><NavLink to="/app/admin/users">Users</NavLink><NavLink to="/app/admin/stores">Stores</NavLink></>}
            {user.role === 'NORMAL_USER' && <NavLink to="/app/stores">Stores</NavLink>}
            {user.role === 'STORE_OWNER' && <NavLink to="/app/owner">My store</NavLink>}
            <NavLink to="/app/security">Security</NavLink>
          </nav>
          <span className="role-label">{roleLabels[user.role]}</span>
          <button className="text-button" type="button" onClick={handleSignOut}>Sign out</button>
        </div>
      ) : null}
    </header>
  )
}
