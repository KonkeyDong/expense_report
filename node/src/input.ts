import prompt from 'prompt';
import {Merchant} from './classes/merchant';
import {MerchantType} from './classes/merchant_type';

prompt.colors = false;

interface IinputData {
    date: string;
    name: string;
    cost: string;
}

const properties = {
  properties: {
    choice: {
      description: '[Y]es, [R]ename, [S]earch, [A]dd, [L]ist',
      type: 'string',
      pattern: /^[YRSAL]$/i,
      required: true,
    },
  },
};

export async function input(data: IinputData, merchants: Merchant, merchantTypes: MerchantType) {
  console.log('name: ', data.name);
  prompt.start();
  const {choice} = await prompt.get(properties);

  if (choice.toUpperCase() === 'Y') return data;

  if (choice.toUpperCase() === 'R') {
    return await rename(data, merchants, merchantTypes);
  }
}

async function rename(data, merchants, merchantTypes) {
  const {choice} = await prompt.get({
    properties: {
      choice: {
        description: 'Enter a new name',
        type: 'string',
        required: true,
      },
    }});

  data = {...data, name: choice};
  return await input(data, merchants, merchantTypes);
}
