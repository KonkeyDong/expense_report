import { Base } from './base'

export class Merchant extends Base {
    table = 'dummy_merchant';
    idColumnName = 'merchant_id' // PK

    async insert (name, merchantTypeId) {
      return (await this.executor({
        text: `INSERT INTO ${this.table}(name, merchant_type_id) VALUES($1, $2) RETURNING ${this.idColumnName}`,
        values: [name, merchantTypeId]
      })).merchant_id
    }

    async update (name, merchantId) {
      return await this.executor({
        text: `UPDATE ${this.table} SET name = $1 WHERE ${this.idColumnName} = $2`,
        values: [name, merchantId]
      })
    }

    async delete (merchantId) {
      return await this.executor(this.buildConfig('DELETE', this.table, this.idColumnName, merchantId))
    }

    async select (merchantId: number) {
      return await this.selector(this.buildConfig('SELECT', this.table, this.idColumnName, merchantId))
    }

    async selectAll () {
      return this.selectAllRecords(this.table)
    }
}
