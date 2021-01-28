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
      description: '[Y]es, [R]ename, [S]elect, [A]dd, [L]ist',
      type: 'string',
      pattern: /^[YRSAL]$/i,
      required: true,
    },
  },
};

// const dispatch

export async function input(data: IinputData, merchant: Merchant, merchantType: MerchantType) {
  const foundData = await lookupName(data, merchant);
  if (foundData) return foundData;

  console.log('raw data: ', data);
  prompt.start();
  const {choice} = await prompt.get(properties);

  if (choice.toUpperCase() === 'Y') return data;

  if (choice.toUpperCase() === 'R') {
    return await rename(data, merchant, merchantType);
  }

  if (choice.toUpperCase() === 'S') {
    return await select(data, merchant, merchantType);
  }

  if (choice.toUpperCase() === 'A') {
    return await add(data, merchant, merchantType);
  }
}

async function lookupName(data, merchant) {
  const foundData = merchant.lookupName(data.name);
  if (foundData) {
    const {date: purchaseDate, cost} = data;
    const {merchant_id: merchantId} = foundData;

    return {
      purchaseDate,
      cost,
      merchantId,
    };
  }

  return undefined;
}

async function getPartialListing(data, merchant) {
  merchant.getTrie().find(data.name);

  const partialListing = merchant
      .getTrie()
      .getPartialMatchings();
  partialListing.unshift('<NO_CHOICE>');

  return partialListing;
}

async function selectPartialListing(partialListing) {
  for (let i = 0; i < partialListing.length; i++) {
    console.log(`${i}`.padStart(5, ' '), ' | ', partialListing[i]);
  }

  const {choice} = await prompt.get({
    properties: {
      choice: {
        description: 'Select a number to select that data',
        type: 'number',
        required: true,
      },
    },
  });

  if (choice === 0) return undefined;

  return partialListing[choice];
}

async function select(data, merchant, merchantType) {
  const partialListing = await getPartialListing(data, merchant);
  const selectedData = await selectPartialListing(partialListing);

  if (!selectedData) return await input(data, merchant, merchantType);

  return await input({...data, name: selectedData.name}, merchant, merchantType);
}

async function rename(data, merchant, merchantType) {
  const {choice} = await prompt.get({
    properties: {
      choice: {
        description: 'Enter a new name',
        type: 'string',
        required: true,
      },
    }});

  data = {...data, name: choice};
  return await input(data, merchant, merchantType);
}

async function add(data, merchant, merchantType) {
  const {merchant_type_id: merchantTypeId} = await merchantType.choose(prompt);
  const merchantId = await merchant.insert(merchantTypeId, data.name);

  // console.log('input::add() data: ', data);
  // console.log('input::add() merchantId: ', merchantId);

  return await input(data, merchant, merchantType);
}
