import {IMerchant} from '../interfaces/merchant';
import {IMerchantType} from '../interfaces/merchant_type';

export class Trie {
    root = {};
    partialFind = '';

    constructor(data?: Array<IMerchant | IMerchantType>) {
      this.root = {};
      data.forEach((string) => this.add(string));
    }

    add(data: IMerchant | IMerchantType) {
      let pointer = this.root;
      for (const character of data.name) {
        if (!pointer[character]) {
          pointer[character] = {};
        }

        pointer = pointer[character];
      }
      pointer[this.lastCharacter(data.name)] = data;
    }

    // if nothing is found, returns undefined.
    // use getPartialMatchings() to find potential matches.
    find(string: string) {
      this.partialFind = '';
      let pointer = this.root;

      for (const character of string) {
        if (!pointer[character]) {
          return false;
        }

        this.partialFind = this.partialFind.concat(character);
        pointer = pointer[character];
      };

      return pointer[this.lastCharacter(string)];
    }

    getPartialMatchings() {
      let pointer = this.root;
      for (const character of this.partialFind) {
        pointer = pointer[character];
      }

      const list = [];
      this.recurseOverListings(pointer, list);
      return list;
    }

    private recurseOverListings(pointer, list) {
      for (const character of Object.keys(pointer)) {
        if (typeof character === 'string' && character.length === 1) {
          this.recurseOverListings(pointer[character], list);
        } else {
          list.push(pointer);
          return;
        }
      }
    }

    private lastCharacter(string: string) {
      return string.slice(-1);
    }

    clear() {
      this.root = {};
      this.partialFind = '';
    }

    display() {
      console.log(JSON.stringify(this.root, undefined, 2));
    }
}
