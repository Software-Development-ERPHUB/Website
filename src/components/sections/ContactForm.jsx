import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, CircleAlert, Loader2, Send } from 'lucide-react'
import { CONTACT } from '../../content/site'
import { postJSON, ApiError } from '../../lib/api'
import { SERVICES } from '../../content/services'
import { BUDGETS } from '../../content/company'

const EMPTY = { name: '', company: '', email: '', phone: '', service: '', budget: '', message: '', website: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter an email address like name@company.com.'
  if (v.phone.trim() && !/^[+()\-\s\d]{7,20}$/.test(v.phone.trim())) e.phone = 'Enter a phone number using digits, spaces or +.'
  if (!v.service) e.service = 'Choose the service you need.'
  if (v.message.trim().length < 10) e.message = 'Tell us a little about your project (at least 10 characters).'
  return e
}

const LABELS = { name: 'Name', email: 'Email', phone: 'Phone', service: 'Service required', message: 'Project details', company: 'Company', budget: 'Budget' }

export default function ContactForm() {
  const [params] = useSearchParams()
  const pre = SERVICES.find((s) => s.id === params.get('service'))
  const [v, setV] = useState({ ...EMPTY, service: pre ? pre.title : '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [via, setVia] = useState('api')
  const [errorMsg, setErrorMsg] = useState('')
  const summaryRef = useRef(null)
  const successRef = useRef(null)

  const set = (k) => (e) => {
    const next = { ...v, [k]: e.target.value }
    setV(next)
    if (touched) setErrors(validate(next))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (v.website) return // honeypot
    setTouched(true)
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('sending')
    const payload = { ...v, website: '', page: window.location.href }

    try {
      if (CONTACT.contactEndpoint) {
        // Saved to MySQL by the Express API (server/src/routes/contact.js)
        await postJSON(CONTACT.contactEndpoint, payload)
        setVia('api')
      } else {
        // Fallback: open the visitor's email client (previous site behaviour)
        const subject = `Project enquiry — ${v.service}${v.company ? ` — ${v.company}` : ''}`
        const body = [
          `Name: ${v.name}`, `Company: ${v.company || '-'}`, `Email: ${v.email}`, `Phone: ${v.phone || '-'}`,
          `Service: ${v.service}`, `Budget: ${v.budget || '-'}`, '', v.message,
        ].join('\n')
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setVia('mailto')
      }
      setStatus('success')
      setV(EMPTY)
      setTouched(false)
      requestAnimationFrame(() => successRef.current?.focus())
    } catch (err) {
      // Server-side validation → show messages next to the fields
      if (err instanceof ApiError && err.status === 422 && Object.keys(err.errors).length) {
        setTouched(true)
        setErrors(err.errors)
        setStatus('idle')
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      setErrorMsg(err instanceof ApiError && err.status === 429 ? err.message : '')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="card flex flex-col items-start gap-4 p-6 sm:p-8">
        <CheckCircle2 size={36} className="text-brand" aria-hidden="true" />
        <h2 className="font-display text-2xl font-semibold">Enquiry sent</h2>
        <p className="text-muted">
          {via === 'mailto'
            ? `Your email app should now be open with your enquiry filled in. Press send there to reach us at ${CONTACT.email}.`
            : 'Thank you. Your enquiry has reached our team and we will reply to the email address you provided.'}
        </p>
        <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>Send another enquiry</button>
      </div>
    )
  }

  const errList = Object.entries(errors)
  const fieldProps = (k) => ({
    id: `f-${k}`,
    name: k,
    value: v[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `e-${k}` : undefined,
    className: 'field',
  })
  const Err = ({ k }) => (errors[k] ? <p id={`e-${k}`} className="field-error">{errors[k]}</p> : null)

  return (
    <form noValidate onSubmit={onSubmit} className="card min-w-0 p-5 sm:p-8" aria-labelledby="enquiry-title">
      <h2 id="enquiry-title" className="font-display text-2xl font-semibold">Tell us about your project</h2>
      <p className="mt-2 text-sm text-muted">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>

      {touched && errList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 font-semibold text-red-800"><CircleAlert size={18} aria-hidden="true" />Please fix {errList.length === 1 ? 'this field' : `these ${errList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-red-800">
            {errList.map(([k, msg]) => <li key={k}><a href={`#f-${k}`} className="underline">{LABELS[k] || k}</a>: {msg}</li>)}
          </ul>
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorMsg || 'Your enquiry could not be sent. Check your connection and try again'}, or email us directly at{' '}
          <a className="font-semibold underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="field-label">Name <span aria-hidden="true">*</span></label>
          <input {...fieldProps('name')} type="text" autoComplete="name" required />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="f-company" className="field-label">Company</label>
          <input {...fieldProps('company')} type="text" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="f-email" className="field-label">Email <span aria-hidden="true">*</span></label>
          <input {...fieldProps('email')} type="email" autoComplete="email" inputMode="email" required />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="f-phone" className="field-label">Phone</label>
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="f-service" className="field-label">Service required <span aria-hidden="true">*</span></label>
          <select {...fieldProps('service')} required>
            <option value="">Choose a service</option>
            {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
            <option value="Other / not sure">Other / not sure</option>
          </select>
          <Err k="service" />
        </div>
        <div>
          <label htmlFor="f-budget" className="field-label">Project budget</label>
          <select {...fieldProps('budget')}>
            <option value="">Choose a range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-message" className="field-label">Project details <span aria-hidden="true">*</span></label>
          <textarea {...fieldProps('message')} rows={6} className="field min-h-[150px] resize-y" required
            placeholder="What do you want to build or improve? Who will use it? Any deadlines?" />
          <Err k="message" />
        </div>
        {/* Honeypot — hidden from people and assistive tech */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">We use these details only to respond to your enquiry.</p>
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />Sending…</> : <><Send size={18} aria-hidden="true" />Send enquiry</>}
        </button>
      </div>
    </form>
  )
}
