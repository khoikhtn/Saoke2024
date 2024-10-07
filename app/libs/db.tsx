import mysql from 'mysql2/promise'

export const createConnection = async () => {
  
  const connection = await mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    connectionLimit: 10
  })

  return connection;
}
