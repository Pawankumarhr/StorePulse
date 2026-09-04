import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function ShellPage() {
  const { user } = useAuth()
  return (
    <section className="content-panel">
      <p className="eyebrow">Workspace ready</p>
      <h1>Good to see you, {user?.name.split(' ')[0]}.</h1>
      <p className="lede">Your StorePulse workspace is connected. The role-specific tools will appear here as each product area comes online.</p>
      <Link className="primary-button" to={user?.role === 'ADMIN' ? '/app/admin' : user?.role === 'STORE_OWNER' ? '/app/owner' : '/app/stores'}>Open your workspace</Link>
    </section>
  )
}

export function PublicPage() {
  return (
    <section className="public-panel">
      <div className="brand-mark" aria-hidden="true">SP</div>
      <p className="eyebrow">Store operations, made visible</p>
      <h1>Store<span>Pulse</span></h1>
      <p className="intro">A clear, honest view of every store and every customer voice.</p>
      <Link className="primary-button" to="/login">Enter workspace</Link>
    </section>
  )
}

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return <section className="content-panel"><p className="eyebrow">Phase 7 foundation</p><h1>{title}</h1><p className="lede">{description}</p></section>
}

export function UnauthorizedPage() {
  return <section className="content-panel"><p className="eyebrow">Access boundary</p><h1>That view is not assigned to you.</h1><p className="lede">Your account can only open the workspace for its current role.</p><Link className="primary-button" to="/app">Return to overview</Link></section>
}
