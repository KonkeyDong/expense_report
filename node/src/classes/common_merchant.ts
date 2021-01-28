import {Base} from './base';
import {Trie} from './trie';
import {IMerchant} from '../interfaces/merchant';
import {IMerchantType} from '../interfaces/merchant_type';

// class to reduce duplicate code between the similar
// Merchant and MerchantType classes
export abstract class CommonMerchant extends Base {
    protected nameMap = undefined;
    protected trie = undefined;

    async selectAll() {
      const data = await super.selectAll();
      this.trie = new Trie(data);
      this.nameMap = this.buildNameCache(data);

      return data;
    }

    protected buildNameCache(data: [IMerchant | IMerchantType]) {
      return data.reduce((cache, current) => {
        cache[current.name] = {...current};

        return cache;
      }, {});
    }

    protected addToNameCache(data: IMerchant | IMerchantType) {
      const {name} = data;
      this.nameMap[name] = data;
    }

    public getTrie() {
      return this.trie;
    }

    public lookupName(name) {
      return this.nameMap[name];
    }
}
