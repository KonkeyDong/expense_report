import {Base} from './base';
import {MerchantType} from './merchant_type';

export class Merchant extends Base {
    table = 'merchant';
    idColumnName = 'merchant_id' // PK
    merchantTypeMap = undefined; // { id: name }
    merchantTypeMapReverse = undefined; // { name: id }

    async insert(name, merchantTypeId) {
      return (await this.executor({
        sql: `INSERT INTO ${this.table} SET name = ?, merchant_type_id = ?`,
        values: [name, merchantTypeId],
      })).merchant_id;
    }

    async update(name, merchantId) {
      return await this.transaction({
        sql: `UPDATE ${this.table} SET name = ? WHERE ${this.idColumnName} = ?`,
        values: [name, merchantId],
      });
    }

    async delete(merchantId) {
      return await this.executor(
          this.buildConfig(
              'DELETE',
              merchantId,
          ));
    }

    async select(merchantId: number) {
      return await this.selector(
          this.buildConfig(
              'SELECT',
              merchantId,
          ))[0];
    }

    async cacheMerchantTypeMap() {
      this.merchantTypeMap = await new MerchantType().selectAll();
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
