import { useEffect, useState } from 'react'
import { adminApi, type Dashboard } from '../../api/admin.api'

export function AdminDashboard() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [error, setError] = useState('')
  useEffect(() => { adminApi.dashboard().then((response) => setDashboard(response.data.data)).catch(() => setError('Unable to load dashboard.')) }, [])
  if (error) return <section className="content-panel"><p className="form-error">{error}</p></section>
  if (!dashboard) return <section className="content-panel"><p className="eyebrow">Administrator</p><h1>Loading dashboard...</h1></section>
  return <section className="admin-page"><p className="eyebrow">Administrator overview</p><h1>Keep the whole network in view.</h1><div className="metric-grid"><Metric label="Users" value={dashboard.totalUsers} /><Metric label="Stores" value={dashboard.totalStores} /><Metric label="Ratings" value={dashboard.totalRatings} /><Metric label="Store owners" value={dashboard.usersByRole.STORE_OWNER ?? 0} /></div><div className="admin-section"><p className="section-kicker">People by role</p><div className="role-list">{Object.entries(dashboard.usersByRole).map(([role, count]) => <div key={role}><span>{role.replace('_', ' ')}</span><strong>{count}</strong></div>)}</div></div></section>
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div> }
