import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'
import { useAuth } from '../../auth/useAuth'

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/

export function Signup() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.password.length < 8 || form.password.length > 16 || !passwordPattern.test(form.password)) {
      setError('Password must be 8-16 characters with an uppercase letter and special character.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await authApi.signup(form)
      signIn(response.data.data)
      navigate('/app')
    } catch (requestError: any) {
      setError(requestError.response?.data?.message?.join?.(', ') ?? 'Unable to create your account.')
    } finally { setLoading(false) }
  }

  return <AuthForm title="Create your account" description="Join the StorePulse workspace." form={form} update={update} submit={submit} error={error} loading={loading} submitLabel="Create account" footer={<><span>Already registered?</span> <Link to="/login">Sign in</Link></>} />
}

function AuthForm({ title, description, form, update, submit, error, loading, submitLabel, footer }: any) {
  return <section className="form-panel"><p className="eyebrow">StorePulse access</p><h1>{title}</h1><p className="lede">{description}</p><form onSubmit={submit}><label>Name<input required maxLength={60} value={form.name} onChange={(event) => update('name', event.target.value)} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label><label>Address<input required maxLength={400} value={form.address} onChange={(event) => update('address', event.target.value)} /></label><label>Password<input required type="password" minLength={8} maxLength={16} value={form.password} onChange={(event) => update('password', event.target.value)} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit" disabled={loading}>{loading ? 'Working...' : submitLabel}</button><div className="form-footer">{footer}</div></form></section>
}