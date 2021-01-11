import { Pool } from 'pg'

// See here for their QueryConfig interface:
// https://node-postgres.com/api/client
interface IQueryConfig {
    text: string; // the raw query text
    values?: Array<any>; // an array of query parameters
    name?: string; // name of the query - used for prepared statements

    // by default rows come out as a key/value pair for each row
    // pass the string 'array' here to receive rows as an array of values
    rowMode?: string;

}

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

    protected async executor (config: IQueryConfig) {
      // See this on wny to use client for transactions:
      // https://node-postgres.com/features/transactions
      const client = await this.pool.connect()

      try {
        await client.query('BEGIN')
        const result = await client.query(config)
        await client.query('COMMIT')
        return result.rows[0]
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    }

    protected async selector (config: IQueryConfig) {
      return this.pool.query(config)
        .then(result => {
          if (!result.rows[0]) {
            console.log('No record was found.')
          }

          return result.rows[0]
        })
        .catch(error => console.log(error.stack))
    }

    protected async selectAllRecords (table) {
      return this.pool.query({
        text: `SELECT * FROM ${table}`
      })
        .then(result => result.rows)
        .catch(error => console.log(error.stack))
    }

    protected buildConfig (keyword, table, idColumnName, id) {
      return {
        text: `${keyword} * FROM ${table} WHERE ${idColumnName} = $1`,
        values: [id]
      }
    }

    finish () {
      this.pool.end()
    }
}
