import { useEffect, useState } from 'react'
import { storeOwnerApi, type OwnerDashboard as OwnerDashboardData } from '../../api/storeOwner.api'
import { RatingStars } from '../../components/RatingStars'

export function OwnerDashboard() {
  const [dashboard, setDashboard] = useState<OwnerDashboardData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    storeOwnerApi.dashboard()
      .then((response) => setDashboard(response.data.data))
      .catch(() => setError('Unable to load your store dashboard.'))
  }, [])

  if (error) return <section className="content-panel"><p className="form-error">{error}</p></section>
  if (!dashboard) return <section className="content-panel"><p className="eyebrow">Store owner</p><h1>Loading your dashboard...</h1></section>

  return <section className="owner-page">
    <p className="eyebrow">Store owner dashboard</p>
    <div className="owner-heading"><div><h1>{dashboard.store.name}</h1><p className="lede">{dashboard.store.address}</p><a href={`mailto:${dashboard.store.email}`}>{dashboard.store.email}</a></div><div className="owner-score"><span>Average rating</span><strong>{dashboard.averageRating.toFixed(1)}</strong><RatingStars value={dashboard.averageRating} label="Overall store rating" /></div></div>
    <div className="metric-grid owner-metrics"><div className="metric"><span>Total ratings</span><strong>{dashboard.totalRatings}</strong></div><div className="metric"><span>Store status</span><strong>Active</strong></div></div>
    <div className="admin-section"><p className="section-kicker">Customer voices</p><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Rating</th><th>Submitted</th></tr></thead><tbody>{dashboard.raters.length ? dashboard.raters.map((rater) => <tr key={rater.userId}><td>{rater.name}</td><td>{rater.email}</td><td><RatingStars value={rater.rating} label={`${rater.name} rating`} /></td><td>{new Date(rater.createdAt).toLocaleDateString()}</td></tr>) : <tr><td className="empty-cell" colSpan={4}>No customer ratings yet.</td></tr>}</tbody></table></div></div>
  </section>
}
