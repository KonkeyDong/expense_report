import pkg from 'pg'
const { Pool } = pkg

export class Base {
    pool = undefined

    constructor (pool?) {
      if (pool) {
        this.pool = pool
      } else {
        this.pool = new Pool({
          user: 'postgres',
          host: '172.17.0.1',
          database: 'postgres',
          password: 'password',
          port: 5432
        })
      }
    }

    async executor (config) {
      // See this on wny to use client for transactions:
      // https://node-postgres.com/features/transactions
      const client = await this.pool.connect()

      try {
        await client.query('BEGIN')
        const result = await client.query(config)
        await client.query('COMMIT')
        return result.rows[0]
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
      }
    }

    finish () {
      this.pool.end()
    }
}
