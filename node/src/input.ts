/* eslint-disable camelcase */
import prompt from 'prompt';
import {Merchant} from './classes/merchant';
import {MerchantType} from './classes/merchant_type';

prompt.colors = false;

interface IinputData {
    date: string;
    name: string;
    cost: string;
}

// const dispatch

export async function input(data: IinputData, merchant: Merchant, merchantType: MerchantType) {
  const foundData = await lookupName(data, merchant);

  if (foundData) return foundData;

  console.log('line data: ', data);
  prompt.start();
  const {choice} = await prompt.get(
      stringPrompt(
          '[Y]es, [R]ename, [S]earch, [A]dd, [L]ist',
          /^[YRSAL]$/i,
      ));

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
    const {merchant_id, merchantId} = foundData;


    return {
      purchaseDate,
      cost,
      merchantId: merchant_id || merchantId,
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

  const {choice} = await prompt.get(
      numberPrompt('Select a number to select that data'),
  );

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
  const {choice} = await prompt.get(
      stringPrompt('Enter a new name'),
  );

  data = {...data, name: choice};
  return await input(data, merchant, merchantType);
}

async function add(data, merchant, merchantType) {
  const {merchant_type_id: merchantTypeId} = await merchantType.choose(prompt);
  const merchantId = await merchant.insert(merchantTypeId, data.name);

  merchant.addToNameCache({
    merchantId,
    merchantTypeId,
    name: data.name,
  });

  return await input(data, merchant, merchantType);
}

function stringPrompt(description, pattern?) {
  const result = buildPromptProperties(description, 'string');
  if (pattern) result.properties.choice['pattern'] = pattern;

  return result;
}

function numberPrompt(description) {
  return buildPromptProperties(description, 'number');
}

function buildPromptProperties(description, type) {
  return {
    properties: {
      choice: {
        description,
        type,
        required: true,
      },
    },
  };
}
