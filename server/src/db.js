import mysql from 'mysql2/promise'
import { config } from './config.js'

/** Shared connection pool. All queries use placeholders (?) — never string-built SQL. */
export const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  dateStrings: true,
})

export async function ping() {
  const [rows] = await pool.query('SELECT 1 AS ok')
  return rows[0]?.ok === 1
}
