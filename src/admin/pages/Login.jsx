import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../auth'
import { Spinner } from '../ui'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await login(email, password)
      nav(loc.state?.from && loc.state.from !== '/admin/login' ? loc.state.from : '/admin', { replace: true })
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink p-4">
      <div className="grid-bg-dark absolute inset-0" aria-hidden="true" />
      <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
      <form onSubmit={submit} className="search-panel relative w-full max-w-sm rounded-2xl bg-white p-7 shadow-pop sm:p-8" aria-labelledby="login-h">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand font-display text-xl font-bold text-white">V</span>
        <h1 id="login-h" className="mt-5 font-display text-2xl font-semibold">Sign in to the CMS</h1>
        <p className="mt-1 text-sm text-muted">Manage news, job openings, FAQs and media.</p>
        {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <label htmlFor="l-email" className="field-label mt-6">Email</label>
        <input id="l-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
        <label htmlFor="l-pass" className="field-label mt-4">Password</label>
        <div className="relative">
          <input id="l-pass" type={show ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="field pr-12" />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button type="submit" className="btn-primary mt-6 w-full" disabled={busy}>{busy ? <><Spinner />Signing in…</> : <><LogIn size={18} />Sign in</>}</button>
        <p className="mt-5 text-center text-xs text-muted">No account? Ask your CMS administrator.</p>
      </form>
    </div>
  )
}
