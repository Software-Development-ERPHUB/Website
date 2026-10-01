import { useCallback, useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'
import { cms, fmtDate } from '../api'
import { useAuth } from '../auth'
import { PageTitle, Spinner, Modal, useToast } from '../ui'

export default function Users() {
  const toast = useToast()
  const { user } = useAuth()
  const [rows, setRows] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'editor', password: '' })
  const [errors, setErrors] = useState({})

  const load = useCallback(() => { cms('/cms/users').then((d) => setRows(d.rows)).catch((e) => toast(e.message, 'error')) }, [toast])
  useEffect(() => { load() }, [load])

  async function add(e) {
    e.preventDefault()
    try { await cms('/cms/users', { method: 'POST', body: form }); toast(`${form.name} can now sign in`); setAdding(false); setForm({ name: '', email: '', role: 'editor', password: '' }); setErrors({}); load() }
    catch (err) { setErrors(err.errors || {}); if (!err.errors) toast(err.message, 'error') }
  }
  async function patch(u, body, msg) {
    try { await cms(`/cms/users/${u.id}`, { method: 'PATCH', body }); toast(msg); load() } catch (e) { toast(e.message, 'error') }
  }
  async function reset(u) {
    const pw = window.prompt(`New password for ${u.name} (min 10 characters)`)
    if (pw) patch(u, { password: pw }, 'Password changed')
  }

  return (
    <>
      <PageTitle title="Users" desc="People who can sign in to the CMS. Editors manage content; admins can also delete entries and manage users."
        actions={<button type="button" className="btn-primary !min-h-[42px]" onClick={() => setAdding(true)}><UserPlus size={18} />Add user</button>} />
      {!rows ? <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p> : (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wider text-muted">
                <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Last sign-in</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"><span className="sr-only">Actions</span></th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-3 font-semibold">{u.name}{u.id === user.id && <span className="ml-1 text-xs font-normal text-muted">(you)</span>}<span className="block text-xs font-normal text-muted">{u.email}</span></td>
                    <td className="px-4 py-3">
                      <select value={u.role} disabled={u.id === user.id} onChange={(e) => patch(u, { role: e.target.value }, 'Role updated')} className="field !min-h-[38px] !w-32" aria-label={`Role for ${u.name}`}>
                        <option value="editor">Editor</option><option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-muted">{fmtDate(u.last_login_at)}</td>
                    <td className="px-4 py-3">{u.active ? <span className="text-green-700">Active</span> : <span className="text-muted">Disabled</span>}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="text-sm font-semibold text-brand hover:underline" onClick={() => reset(u)}>Reset password</button>
                      {u.id !== user.id && <button type="button" className="ml-4 text-sm font-semibold text-muted hover:text-ink" onClick={() => patch(u, { active: !u.active }, u.active ? 'User disabled' : 'User enabled')}>{u.active ? 'Disable' : 'Enable'}</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {adding && (
        <Modal title="Add user" onClose={() => setAdding(false)}>
          <form onSubmit={add} className="grid gap-4" noValidate>
            {[['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['password', 'Temporary password (min 10 characters)', 'text']].map(([k, l, t]) => (
              <div key={k}>
                <label htmlFor={`u-${k}`} className="field-label">{l}</label>
                <input id={`u-${k}`} type={t} className="field" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={errors[k] ? 'true' : undefined} />
                {errors[k] && <p className="field-error">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="u-role" className="field-label">Role</label>
              <select id="u-role" className="field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="editor">Editor — create, edit and publish content</option>
                <option value="admin">Admin — everything, plus users and deleting</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">Create user</button>
          </form>
        </Modal>
      )}
    </>
  )
}
