import {Base} from './base';
// const Base = require('./base');

export class MerchantType extends Base {
    protected table = 'merchant_type';
    protected idColumnName = 'merchant_type_id' // PK

    async insert(name) {
      return (await this.executor({
        sql: `INSERT INTO ${this.table} SET name = ?`,
        values: [name],
      })).insertId;
    }

    async update(name, merchantTypeId) {
      return (await this.transaction({
        sql: `UPDATE ${this.table} SET name = ? WHERE ${this.idColumnName} = ?`,
        values: [name, merchantTypeId],
      }));
    }

    async delete(merchantTypeId) {
      return (await this.transaction(
          this.buildConfig(
              'DELETE',
              merchantTypeId,
          )));
    }

    async select(merchantTypeId) {
      return (await this.selector(
          this.buildConfig(
              'SELECT',
              merchantTypeId),
      ))[0];
    }
}
