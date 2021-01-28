import {CommonMerchant} from './common_merchant';
import {IMerchant} from '../interfaces/merchant';

export class Merchant extends CommonMerchant {
    protected table = 'merchant';
    protected idColumnName = 'merchant_id' // PK

    async insert(merchantTypeId, name) {
      const merchantId = (await this.executor({
        sql: `INSERT INTO ${this.table} SET name = ?, merchant_type_id = ?`,
        values: [name, merchantTypeId],
      })).insertId;

      const data: IMerchant = {
        merchantId,
        merchantTypeId,
        name,
      };
      this.trie.add(data);
      this.addToNameCache(data);

      return merchantId;
    }

    async update(merchantTypeId, name) {
      return (await this.transaction({
        sql: `UPDATE ${this.table} SET name = ? WHERE ${this.idColumnName} = ?`,
        values: [name, merchantTypeId],
      }));
    }

    async delete(merchantId) {
      return await this.transaction(
          this.buildConfig(
              'DELETE',
              merchantId,
          ));
    }

    async select(merchantId) {
      return (await this.selector(
          this.buildConfig(
              'SELECT',
              merchantId),
      ))[0];
    }
}
