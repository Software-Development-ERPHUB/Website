import { useState } from 'react'
import { cms } from '../api'
import { useAuth } from '../auth'
import { PageTitle, useToast } from '../ui'

export default function Account() {
  const { user } = useAuth()
  const toast = useToast()
  const [f, setF] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})

  async function submit(e) {
    e.preventDefault()
    if (f.next !== f.confirm) return setErrors({ confirm: 'Passwords do not match.' })
    try { await cms('/auth/password', { method: 'POST', body: { current: f.current, next: f.next } }); toast('Password changed'); setF({ current: '', next: '', confirm: '' }); setErrors({}) }
    catch (err) { setErrors(err.errors || {}); if (!err.errors) toast(err.message, 'error') }
  }
  return (
    <>
      <PageTitle title="My account" desc={`${user.name} · ${user.email} · ${user.role}`} />
      <form onSubmit={submit} className="max-w-md space-y-4 rounded-xl border border-line bg-white p-6" noValidate>
        <h2 className="font-display text-lg font-semibold">Change password</h2>
        {[['current', 'Current password', 'current-password'], ['next', 'New password (min 10 characters)', 'new-password'], ['confirm', 'Confirm new password', 'new-password']].map(([k, l, ac]) => (
          <div key={k}>
            <label htmlFor={`a-${k}`} className="field-label">{l}</label>
            <input id={`a-${k}`} type="password" autoComplete={ac} className="field" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={errors[k] ? 'true' : undefined} />
            {errors[k] && <p className="field-error">{errors[k]}</p>}
          </div>
        ))}
        <button type="submit" className="btn-primary">Update password</button>
      </form>
    </>
  )
}
