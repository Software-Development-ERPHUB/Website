// Creates the database and tables from sql/schema.sql using the .env settings.
import fs from 'node:fs'
import path from 'node:path'
import mysql from 'mysql2/promise'
import { config } from '../config.js'

const name = config.db.database
if (!/^[A-Za-z0-9_]+$/.test(name)) throw new Error('DB_NAME may only contain letters, numbers and _')

const sql = fs.readFileSync(path.join(config.root, 'sql', 'schema.sql'), 'utf8').replaceAll('voltech_website', name)
const conn = await mysql.createConnection({ host: config.db.host, port: config.db.port, user: config.db.user, password: config.db.password, multipleStatements: true })
await conn.query(sql)
await conn.end()
console.log(`Database "${name}" is ready.`)
