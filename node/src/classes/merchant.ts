import {CommonMerchant} from './common_merchant';

export class Merchant extends CommonMerchant {
    protected table = 'merchant';
    protected idColumnName = 'merchant_id' // PK

    async insert(id, name) {
      return (await this.executor({
        sql: `INSERT INTO ${this.table} SET name = ?, merchant_type_id = ?`,
        values: [name, id],
      })).insertId;
    }

    async update(id, name) {
      return (await this.transaction({
        sql: `UPDATE ${this.table} SET name = ? WHERE ${this.idColumnName} = ?`,
        values: [name, id],
      }));
    }

    async delete(id) {
      return await this.transaction(
          this.buildConfig(
              'DELETE',
              id,
          ));
    }

    async select(id) {
      return (await this.selector(
          this.buildConfig(
              'SELECT',
              id),
      ))[0];
    }
}
