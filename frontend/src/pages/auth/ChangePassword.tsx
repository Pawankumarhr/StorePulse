import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'

export function ChangePassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(''); setMessage('')
    try { const response = await authApi.updatePassword(form); setMessage(response.data.data?.message ?? 'Password updated successfully') } catch (requestError: any) { setError(requestError.response?.data?.message?.join?.(', ') ?? 'Unable to update your password.') }
  }
  return <section className="form-panel"><p className="eyebrow">Account security</p><h1>Update password</h1><p className="lede">Keep your account credentials current.</p><form onSubmit={submit}><label>Current password<input required type="password" value={form.currentPassword} onChange={(event) => setForm({ ...form, currentPassword: event.target.value })} /></label><label>New password<input required type="password" minLength={8} maxLength={16} value={form.newPassword} onChange={(event) => setForm({ ...form, newPassword: event.target.value })} /></label>{error && <p className="form-error" role="alert">{error}</p>}{message && <p className="form-success" role="status">{message}</p>}<button className="primary-button" type="submit">Update password</button><button className="text-button" type="button" onClick={() => navigate('/app')}>Return to workspace</button></form></section>
}