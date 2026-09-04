import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { adminApi, type UserDetail as UserDetailData } from '../../api/admin.api'

export function UserDetail() {
  const { id } = useParams(); const [detail, setDetail] = useState<UserDetailData | null>(null); const [error, setError] = useState('')
  useEffect(() => { if (id) adminApi.user(Number(id)).then((response) => setDetail(response.data.data)).catch(() => setError('Unable to load user details.')) }, [id])
  if (error) return <section className="content-panel"><p className="form-error">{error}</p></section>
  if (!detail) return <section className="content-panel"><p className="eyebrow">User detail</p><h1>Loading profile...</h1></section>
  return <section className="admin-page"><Link className="back-link" to="/app/admin/users">â† Back to users</Link><p className="eyebrow">User detail</p><h1>{detail.user.name}</h1><p className="lede">{detail.user.email} Â· {detail.user.role.replace('_', ' ')}</p><div className="detail-grid"><div><span>Address</span><strong>{detail.user.address}</strong></div><div><span>Ratings given</span><strong>{detail.ratings.length}</strong></div></div><div className="admin-section"><p className="section-kicker">Rating history</p>{detail.ratings.length ? <div className="rating-history">{detail.ratings.map((rating) => <div key={rating.id}><strong>{rating.storeName}</strong><span>{rating.rating}/5</span></div>)}</div> : <p className="muted">This user has not rated a store yet.</p>}</div></section>
}
