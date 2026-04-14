import { Pool, ClientBase } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
})

// Single query transactions.
export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params)
}

// Use for multi-query transactions.
export async function withConnection<T>(
  fn: (client: ClientBase) => Promise<T>,
): Promise<T> {
  const client = await pool.connect()
  try {
    return await fn(client)
  } finally {
    client.release()
  }
}
