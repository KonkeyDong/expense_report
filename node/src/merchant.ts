import {Base} from './base';
import {MerchantType} from './merchant_type';

export class Merchant extends Base {
    protected table = 'merchant';
    protected idColumnName = 'merchant_id' // PK
    protected merchantTypeMap = undefined; // { id: name }
    protected merchantTypeMapReverse = undefined; // { name: id }

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

    async cacheMerchantTypeMap() {
      this.merchantTypeMap = await new MerchantType(this.pool).selectAll();
      // this.merchantTypeMapReverse = this.reverseObject(this.merchantTypeMap)
    }

    reverseObject(object) {
      return Object.keys(object).reduce((cache, key) => {
        const name = object[key];
        cache[name] = key;
        return cache;
      }, {});
    }
}
