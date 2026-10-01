import { useMemo, useRef, useState } from 'react'
import { CheckCircle2, CircleAlert, FileText, Loader2, Send, UploadCloud, X, User, GraduationCap, Target, Paperclip } from 'lucide-react'
import { CONTACT } from '../../content/site'
import { INTERNSHIP } from '../../content/company'
import { postForm, ApiError } from '../../lib/api'

const EMPTY = {
  fullName: '', email: '', phone: '', college: '', course: '', yearOfStudy: '', area: '', duration: '',
  startDate: '', skills: '', portfolioUrl: '', linkedinUrl: '', message: '', consent: false, website: '',
}
const REQUIRED = ['fullName', 'email', 'phone', 'college', 'course', 'yearOfStudy', 'area', 'cv', 'consent']
const LABELS = {
  fullName: 'Full name', email: 'Email', phone: 'Phone', college: 'College / institution', course: 'Degree / course',
  yearOfStudy: 'Year of study', area: 'Area of interest', duration: 'Duration', startDate: 'Start date',
  portfolioUrl: 'Portfolio / GitHub', linkedinUrl: 'LinkedIn', cv: 'CV', consent: 'Consent',
}
const OK_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const OK_EXT = /\.(pdf|docx?)$/i
const URL_RE = /^https?:\/\/\S+$/i

function validate(v, file) {
  const e = {}
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter an email address like name@college.edu.'
  if (!/^[+()\-\s\d]{7,20}$/.test(v.phone.trim())) e.phone = 'Enter a phone number using digits, spaces or +.'
  if (!v.college.trim()) e.college = 'Enter your college or institution.'
  if (!v.course.trim()) e.course = 'Enter your degree or course, e.g. B.E. Computer Science.'
  if (!v.yearOfStudy) e.yearOfStudy = 'Choose your year of study.'
  if (!v.area) e.area = 'Choose the area you want to work in.'
  if (v.portfolioUrl && !URL_RE.test(v.portfolioUrl.trim())) e.portfolioUrl = 'Enter the full link, starting with https://'
  if (v.linkedinUrl && !URL_RE.test(v.linkedinUrl.trim())) e.linkedinUrl = 'Enter the full link, starting with https://'
  if (!file) e.cv = `Attach your CV (PDF, DOC or DOCX, up to ${INTERNSHIP.maxCvMb} MB).`
  if (!v.consent) e.consent = 'Please agree so we can store your application.'
  return e
}

const fmtSize = (b) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

function Group({ icon: I, title, children }) {
  return (
    <fieldset className="rounded-xl border border-line p-5 sm:p-6">
      <legend className="-ml-1 flex items-center gap-2 px-1 font-display text-lg font-semibold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand"><I size={17} aria-hidden="true" /></span>{title}
      </legend>
      <div className="mt-2 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

/** Internship application — saved to MySQL with the CV via the Express API. */
export default function InternshipForm() {
  const [v, setV] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [refId, setRefId] = useState(null)
  const [drag, setDrag] = useState(false)
  const fileInput = useRef(null)
  const summaryRef = useRef(null)
  const successRef = useRef(null)

  const done = useMemo(() => REQUIRED.filter((k) => (k === 'cv' ? !!file : k === 'consent' ? v.consent : String(v[k]).trim())).length, [v, file])
  const pct = Math.round((done / REQUIRED.length) * 100)

  const update = (next, nextFile = file) => { setV(next); if (touched) setErrors(validate(next, nextFile)) }
  const set = (k) => (e) => update({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  function pickFile(f) {
    if (!f) return
    const bad = !(OK_TYPES.includes(f.type) || OK_EXT.test(f.name)) ? 'Upload your CV as a PDF, DOC or DOCX file.'
      : f.size > INTERNSHIP.maxCvMb * 1024 * 1024 ? `CV must be ${INTERNSHIP.maxCvMb} MB or smaller.` : ''
    if (bad) { setErrors((x) => ({ ...x, cv: bad })); setFile(null); return }
    setFile(f)
    setErrors((x) => { const n = { ...x }; delete n.cv; return n })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (v.website) return // honeypot
    setTouched(true)
    const errs = validate(v, file)
    setErrors(errs)
    if (Object.keys(errs).length) { requestAnimationFrame(() => summaryRef.current?.focus()); return }

    const fd = new FormData()
    Object.entries(v).forEach(([k, val]) => fd.append(k, typeof val === 'boolean' ? String(val) : val.trim()))
    fd.append('cv', file)
    setStatus('sending'); setProgress(0); setMessage('')
    try {
      const res = await postForm(CONTACT.internshipEndpoint, fd, setProgress)
      setRefId(res.id || null)
      setStatus('success')
      setV(EMPTY); setFile(null); setTouched(false)
      requestAnimationFrame(() => successRef.current?.focus())
    } catch (err) {
      if (err instanceof ApiError && err.status === 422 && Object.keys(err.errors).length) {
        setErrors(err.errors); setStatus('idle')
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      setMessage(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="card slide-in flex flex-col items-center gap-4 p-8 text-center sm:p-12">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white shadow-pop">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" aria-hidden="true" />
          <CheckCircle2 size={40} aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-semibold">Application received</h3>
        <p className="max-w-md text-muted">Thank you for applying. Our team will review your CV and contact you by email if your profile matches an opening.</p>
        {refId && <p className="rounded-lg bg-paper px-4 py-2 text-sm">Reference number: <strong className="font-display">INT-{String(refId).padStart(5, '0')}</strong></p>}
        <button type="button" className="btn-secondary mt-2" onClick={() => setStatus('idle')}>Submit another application</button>
      </div>
    )
  }

  const errList = Object.entries(errors)
  const fp = (k) => ({
    id: `i-${k}`, name: k, value: v[k], onChange: set(k), className: 'field',
    'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `ie-${k}` : undefined,
  })
  const Err = ({ k }) => (errors[k] ? <p id={`ie-${k}`} className="field-error">{errors[k]}</p> : null)
  const Req = () => <span aria-hidden="true" className="text-brand">*</span>

  return (
    <form noValidate onSubmit={onSubmit} className="card min-w-0 p-5 sm:p-8" aria-labelledby="intern-form-h">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 id="intern-form-h" className="font-display text-2xl font-semibold">Apply for an internship</h3>
          <p className="mt-1 text-sm text-muted">Fields marked <Req /><span className="sr-only">with an asterisk</span> are required. Takes about 3 minutes.</p>
        </div>
        {/* completion meter */}
        <div className="w-full sm:w-52" aria-hidden="true">
          <div className="flex justify-between text-xs font-semibold text-muted"><span>Completed</span><span className="text-brand">{pct}%</span></div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {touched && errList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 font-semibold text-red-800"><CircleAlert size={18} aria-hidden="true" />Please fix {errList.length === 1 ? 'this field' : `these ${errList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-red-800">
            {errList.map(([k, msg]) => <li key={k}><a href={`#i-${k}`} className="underline">{LABELS[k] || k}</a>: {msg}</li>)}
          </ul>
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {message || 'Your application could not be sent.'} If this keeps happening, email your CV to{' '}
          <a className="font-semibold underline" href={`mailto:${CONTACT.careersEmail || CONTACT.email}?subject=${encodeURIComponent('Internship application')}`}>{CONTACT.careersEmail || CONTACT.email}</a>.
        </div>
      )}

      <div className="mt-6 space-y-6">
        <Group icon={User} title="About you">
          <div className="sm:col-span-2">
            <label htmlFor="i-fullName" className="field-label">Full name <Req /></label>
            <input {...fp('fullName')} type="text" autoComplete="name" required />
            <Err k="fullName" />
          </div>
          <div>
            <label htmlFor="i-email" className="field-label">Email <Req /></label>
            <input {...fp('email')} type="email" autoComplete="email" inputMode="email" required />
            <Err k="email" />
          </div>
          <div>
            <label htmlFor="i-phone" className="field-label">Phone <Req /></label>
            <input {...fp('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required />
            <Err k="phone" />
          </div>
        </Group>

        <Group icon={GraduationCap} title="Education">
          <div className="sm:col-span-2">
            <label htmlFor="i-college" className="field-label">College / institution <Req /></label>
            <input {...fp('college')} type="text" autoComplete="organization" required />
            <Err k="college" />
          </div>
          <div>
            <label htmlFor="i-course" className="field-label">Degree / course <Req /></label>
            <input {...fp('course')} type="text" placeholder="e.g. B.E. Computer Science" required />
            <Err k="course" />
          </div>
          <div>
            <label htmlFor="i-yearOfStudy" className="field-label">Year of study <Req /></label>
            <select {...fp('yearOfStudy')} required>
              <option value="">Choose</option>
              {INTERNSHIP.years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <Err k="yearOfStudy" />
          </div>
        </Group>

        <Group icon={Target} title="Internship preferences">
          <div className="sm:col-span-2">
            <span id="area-label" className="field-label">Area of interest <Req /></span>
            <div role="radiogroup" aria-labelledby="area-label" aria-describedby={errors.area ? 'ie-area' : undefined} className="flex flex-wrap gap-2" id="i-area">
              {INTERNSHIP.areas.map((a) => {
                const on = v.area === a
                return (
                  <label key={a} className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border px-3.5 text-sm font-medium transition-all duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-steel/20 ${on ? 'border-brand bg-brand text-white shadow-lift' : 'border-line bg-white hover:-translate-y-0.5 hover:border-brand hover:text-brand'}`}>
                    <input type="radio" name="area" value={a} checked={on} onChange={set('area')} className="sr-only" />
                    {a}
                  </label>
                )
              })}
            </div>
            <Err k="area" />
          </div>
          <div>
            <label htmlFor="i-duration" className="field-label">Preferred duration</label>
            <select {...fp('duration')}>
              <option value="">Choose</option>
              {INTERNSHIP.durations.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <Err k="duration" />
          </div>
          <div>
            <label htmlFor="i-startDate" className="field-label">Available from</label>
            <input {...fp('startDate')} type="date" min={new Date().toISOString().slice(0, 10)} />
            <Err k="startDate" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="i-skills" className="field-label">Skills</label>
            <input {...fp('skills')} type="text" placeholder="e.g. HTML, CSS, JavaScript, React, SQL" />
          </div>
        </Group>

        <Group icon={Paperclip} title="CV and links">
          <div className="sm:col-span-2">
            <span className="field-label" id="cv-label">CV / résumé <Req /></span>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]) }}
              className={`relative rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300 ${drag ? 'scale-[1.01] border-brand bg-brand-soft' : errors.cv ? 'border-red-400 bg-red-50/50' : 'border-line bg-paper hover:border-brand/60'}`}>
              {file ? (
                <div className="flex items-center gap-3 text-left">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand text-white"><FileText size={22} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{file.name}</p>
                    <p className="text-sm text-muted">{fmtSize(file.size)} · ready to upload</p>
                  </div>
                  <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = '' }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-white hover:text-red-700" aria-label="Remove CV">
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud size={34} className={`mx-auto text-brand transition-transform duration-300 ${drag ? '-translate-y-1 scale-110' : ''}`} aria-hidden="true" />
                  <p className="mt-2 font-semibold">Drag your CV here, or <button type="button" onClick={() => fileInput.current?.click()} className="link">browse</button></p>
                  <p className="mt-1 text-sm text-muted">PDF, DOC or DOCX · up to {INTERNSHIP.maxCvMb} MB</p>
                </>
              )}
              <input ref={fileInput} id="i-cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only" aria-labelledby="cv-label" aria-invalid={errors.cv ? 'true' : undefined} aria-describedby={errors.cv ? 'ie-cv' : undefined}
                onChange={(e) => pickFile(e.target.files?.[0])} />
            </div>
            <Err k="cv" />
          </div>
          <div>
            <label htmlFor="i-portfolioUrl" className="field-label">Portfolio / GitHub</label>
            <input {...fp('portfolioUrl')} type="url" inputMode="url" placeholder="https://github.com/you" />
            <Err k="portfolioUrl" />
          </div>
          <div>
            <label htmlFor="i-linkedinUrl" className="field-label">LinkedIn</label>
            <input {...fp('linkedinUrl')} type="url" inputMode="url" placeholder="https://linkedin.com/in/you" />
            <Err k="linkedinUrl" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="i-message" className="field-label">Why do you want to intern with us?</label>
            <textarea {...fp('message')} rows={4} className="field min-h-[110px] resize-y" placeholder="A few lines about you, projects you have built and what you want to learn." />
          </div>
        </Group>

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="i-website">Website</label>
          <input id="i-website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input id="i-consent" type="checkbox" checked={v.consent} onChange={set('consent')}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[rgb(var(--c-primary))]"
              aria-invalid={errors.consent ? 'true' : undefined} aria-describedby={errors.consent ? 'ie-consent' : undefined} />
            <span className="text-muted">I agree that my application and CV are stored so the team can review them for internship openings. <Req /></span>
          </label>
          <Err k="consent" />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {status === 'sending' ? (
          <div className="w-full sm:max-w-xs" role="status" aria-live="polite">
            <div className="flex justify-between text-xs font-semibold text-muted"><span>Uploading…</span><span>{progress}%</span></div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper"><div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${progress}%` }} /></div>
          </div>
        ) : <p className="text-xs text-muted">We use these details only to review your application.</p>}
        <button type="submit" className="btn-primary group w-full sm:w-auto" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending'
            ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />Submitting…</>
            : <><Send size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />Submit application</>}
        </button>
      </div>
    </form>
  )
}
