// Creates (or resets) a CMS dashboard admin.
//   npm run cms:create-admin                       → asks for name, email, password
//   npm run cms:create-admin -- --name "Gopi" --email gopi@company.com --password "long-password"
import readline from 'node:readline'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'

const arg = (k) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : undefined }

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: process.stdin.isTTY })
const lines = rl[Symbol.asyncIterator]()
const ask = async (q, given) => {
  if (given !== undefined) return given
  process.stdout.write(q)
  const { value } = await lines.next()
  return (value || '').trim()
}

try {
  console.log('\nCreate a CMS admin user\n')
  const name = await ask('Full name: ', arg('name'))
  const email = (await ask('Email: ', arg('email'))).toLowerCase()
  const password = await ask('Password (min 10 characters): ', arg('password'))
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || password.length < 10) {
    console.error('\nName, a valid email and a password of 10+ characters are required.')
    process.exitCode = 1
  } else {
    const hash = await bcrypt.hash(password, 12)
    await pool.execute(
      `INSERT INTO cms_users (name, email, role, password_hash, active) VALUES (?, ?, 'admin', ?, 1)
       ON DUPLICATE KEY UPDATE name = VALUES(name), role = 'admin', password_hash = VALUES(password_hash), active = 1`,
      [name, email, hash])
    console.log(`\nAdmin ready: ${email}\nSign in at http://localhost:5173/admin`)
  }
} catch (err) {
  console.error('\nCould not create the admin:', err.code || '', err.message)
  if (err.code === 'ER_NO_SUCH_TABLE') console.error('Run  npm run db:init  first to create the CMS tables.')
  process.exitCode = 1
} finally {
  rl.close()
  await pool.end()
}
