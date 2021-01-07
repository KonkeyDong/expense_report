import { Base } from './base'

/* eslint-disable camelcase */

interface IMerchant {
    merchant_id?: number,
    name: string,
    merchant_type_id: number
}

export class Merchant extends Base {
    table = 'merchant';

    async insert (name, merchant_type_id) {
      return (await this.executor({
        text: 'INSERT INTO dummy_merchant(name, merchant_type_id) VALUES($1, $2) RETURNING merchant_id',
        values: [name, merchant_type_id]
      })).merchant_id
    }

    async update (merchant_id, name) {
      return await this.executor({
        text: 'UPDATE dummy_merchant SET name = $1 WHERE merchant_id = $2',
        values: [name, merchant_id]
      })
    }

    async delete (merchant_id) {
      return await this.executor({
        text: 'DELETE FROM dummy_merchant WHERE merchant_id = $1',
        values: [merchant_id]
      })
    }

    async getMerchantById (id: number) {
      return this.pool.query('SELECT * FROM merchant WHERE merchant_id = $1', [id])
        .then(result => {
          if (!result.rows[0]) {
            console.log(`No merchant by ID [${id}] was found.`)
          }

          return result.rows[0]
        })
        .catch(error => console.log(error.stack))
    }

    async getAllMerchants () {
      return this.pool.query('SELECT * FROM merchant')
        .then(result => result.rows)
        .catch(error => console.log(error.stack))
    }
}
