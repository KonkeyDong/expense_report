import { Base } from './base'
import sjcl from 'sjcl'

interface IExpenses {
  purchaseDate: string, // YYYY-MM-DD
  merchantId: number,
  cost: number,
  note?: string,
  // hashCode: string
}

export class Expenses extends Base {
    table = 'dummy_expenses';
    idColumnName = 'expenses_id' // PK

    async insert ({ purchaseDate, merchantId, cost, note }: IExpenses) {
      const hashCode = await this.sha256Sum(purchaseDate, merchantId, cost)

      return (await this.executor({
        text: `INSERT INTO ${this.table}(
            purchase_date, 
            merchant_id, 
            cost, 
            note, 
            hash_code
          ) VALUES($1, $2, $3, $4, $5) RETURNING ${this.idColumnName}`,
        values: [purchaseDate, merchantId, cost, note, hashCode]
      })).merchant_id
    }

    async update (name, expensesId) {
      return await this.executor({
        text: `UPDATE ${this.table} SET name = $1 WHERE ${this.idColumnName} = $2`,
        values: [name, expensesId]
      })
    }

    async delete (expensesId) {
      return await this.executor(this.buildConfig('DELETE', this.table, this.idColumnName, expensesId))
    }

    async select (expensesId) {
      return await this.selector(this.buildConfig('SELECT', this.table, this.idColumnName, expensesId))
    }

    async selectAll () {
      return this.selectAllRecords(this.table)
    }

    private async sha256Sum (date, merchantId, cost) {
      const data = [date, merchantId, cost].join('|')
      const bit = sjcl.hash.sha256.hash(data)
      return sjcl.codec.hex.fromBits(bit)
    }
}
