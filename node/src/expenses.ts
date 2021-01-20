import {Base} from './base';
import sjcl from 'sjcl';

interface IExpenses {
  purchaseDate: string, // YYYY-MM-DD
  merchantId: number,
  cost: number,
  note?: string,
  // hashCode: string
}

export class Expenses extends Base {
    table = 'expenses';
    idColumnName = 'expenses_id' // PK

    async insert({purchaseDate, merchantId, cost, note}: IExpenses) {
      const hashCode = await this.sha256Sum(purchaseDate, merchantId, cost);

      return (await this.executor({
        sql: `INSERT INTO ${this.table} SET
            purchase_date = ?, 
            merchant_id = ?, 
            cost = ?, 
            note = ?, 
            hash_code = ?`,
        values: [purchaseDate, merchantId, cost, note, hashCode],
      })).insertId;
    }

    async update(name, expensesId) {
      return (await this.transaction({
        sql: `UPDATE ${this.table} SET name = ? WHERE ${this.idColumnName} = ?`,
        values: [name, expensesId],
      }));
    }

    async delete(expensesId) {
      return await this.executor(
          this.buildConfig(
              'DELETE',
              expensesId,
          ));
    }

    async select(expensesId) {
      return await this.selector(
          this.buildConfig(
              'SELECT',
              expensesId,
          ))[0];
    }

    private async sha256Sum(date, merchantId, cost) {
      const data = [date, merchantId, cost].join('|');
      const bit = sjcl.hash.sha256.hash(data);
      return sjcl.codec.hex.fromBits(bit);
    }
}
