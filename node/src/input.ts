// This module file is mainly to test input before I build the frontend!
// It will be removed later. I was just testing if things were behaving correctly.

/* eslint-disable camelcase */
import prompt from 'prompt';
import {Merchant} from './classes/merchant';
import {MerchantType} from './classes/merchant_type';

prompt.colors = false;

interface IinputData {
    purchaseDate: string;
    name: string;
    cost: string;
}

const dispatch = {
  Y: (data, ...rest) => {
    return data
    ;
  },
  R: rename,
  S: select,
  A: add,
};

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

  const func = dispatch[choice.toUpperCase()];
  return func ?
    await func(data, merchant, merchantType) :
    await input(data, merchant, merchantType);
}

export async function lookupName(data, merchant) {
  const foundData = merchant.lookupName(data.name);
  if (foundData) {
    const {purchaseDate, cost} = data;
    const {merchant_id, merchantId} = foundData;


    return {
      purchaseDate,
      cost,
      merchantId: merchant_id || merchantId,
    };
  }

  return undefined;
}

export async function getPartialListing(data, merchant) {
  merchant.getTrie().find(data.name);

  const partialListing = merchant
      .getTrie()
      .getPartialMatchings();
  partialListing.unshift('<NO_CHOICE>');

  return partialListing;
}

export async function selectPartialListing(partialListing) {
  for (let i = 0; i < partialListing.length; i++) {
    console.log(`${i}`.padStart(5, ' '), ' | ', partialListing[i]);
  }

  const {choice} = await prompt.get(
      numberPrompt('Select a number to select that data'),
  );

  if (choice === 0) return undefined;

  return partialListing[choice];
}

export async function select(data, merchant, merchantType) {
  const partialListing = await getPartialListing(data, merchant);
  const selectedData = await selectPartialListing(partialListing);

  if (!selectedData) return await input(data, merchant, merchantType);

  return await input({...data, name: selectedData.name}, merchant, merchantType);
}

export async function rename(data, merchant, merchantType) {
  const {choice} = await prompt.get(
      stringPrompt('Enter a new name'),
  );

  data = {...data, name: choice};
  return await input(data, merchant, merchantType);
}

export async function add(data, merchant, merchantType) {
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
