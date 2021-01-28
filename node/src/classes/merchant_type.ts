import {CommonMerchant} from './common_merchant';

export class MerchantType extends CommonMerchant {
    protected table = 'merchant_type';
    protected idColumnName = 'merchant_type_id' // PK
    private listingChoice = undefined;

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

    private async buildListing() {
      const idMap = Object.keys(this.nameMap)
          .map((name) => ({
            merchant_type_id: this.nameMap[name].merchant_type_id,
            name: name,
          }))
          .sort((a, b) => a.merchant_type_id - b.merchant_type_id);

      idMap.unshift({merchant_type_id: 0, name: 'IGNORE'});

      this.listingChoice = idMap;
    }

    async choose(prompt) {
      if (!this.listingChoice) this.buildListing();

      for (let i = 0; i < this.listingChoice.length; i++) {
        console.log(`${i}`.padStart(5, ' '), ' | ', this.listingChoice[i].name);
      }

      const {choice} = await prompt.get({
        properties: {
          choice: {
            description: 'Select a Merchant Type',
            type: 'number',
            required: true,
          },
        },
      });

      if (choice === 0) return undefined;

      return this.listingChoice[choice];
    }
}
