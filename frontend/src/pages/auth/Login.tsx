import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'
import { useAuth } from '../../auth/useAuth'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setError('')
    try { const response = await authApi.login(form); signIn(response.data.data); navigate((location.state as { from?: Location })?.from?.pathname ?? '/app') } catch (requestError: any) { setError(requestError.response?.data?.message?.join?.(', ') ?? 'Unable to sign in.') } finally { setLoading(false) }
  }
  return <section className="form-panel"><p className="eyebrow">StorePulse access</p><h1>Welcome back.</h1><p className="lede">Sign in to continue to your workspace.</p><form onSubmit={submit}><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Password<input required type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button><div className="form-footer"><span>New to StorePulse?</span> <Link to="/signup">Create an account</Link></div></form></section>
}
