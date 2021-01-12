import { Base } from './base'

export class MerchantType extends Base {
    table = 'dummy_merchant_type';
    idColumnName = 'merchant_type_id' // PK

    async insert (name) {
      return (await this.executor({
        text: `INSERT INTO ${this.table}(name) VALUES($1) RETURNING ${this.idColumnName}`,
        values: [name]
      })).merchant_id
    }

    async update (name, merchantTypeId) {
      return await this.executor({
        text: `UPDATE ${this.table} SET name = $1 WHERE ${this.idColumnName} = $2`,
        values: [name, merchantTypeId]
      })
    }

    async delete (merchantTypeId) {
      return await this.executor(this.buildConfig('DELETE', this.table, this.idColumnName, merchantTypeId))
    }

    async select (merchantTypeId) {
      return await this.selector(this.buildConfig('SELECT', this.table, this.idColumnName, merchantTypeId))
    }

    async selectAll () {
      return this.selectAllRecords(this.table)
    }
}
