import {Base} from './base';

export class MerchantType extends Base {
    table = 'merchant_type';
    idColumnName = 'merchant_type_id' // PK

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
      return await this.executor(
          this.buildConfig(
              'DELETE',
              merchantTypeId,
          ));
    }

    async select(merchantTypeId) {
      return (await this.selector(
          this.buildConfig(
              'SELECT',
              merchantTypeId),
      ))[0];
    }
}
