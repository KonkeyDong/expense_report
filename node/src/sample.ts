
import {MerchantType} from './classes/merchant_type';
// import {Expenses} from './expenses';
import {Merchant} from './classes/merchant';
import {input} from './input';

const fs = require('fs').promises;


async function main() {
  const merchant = new Merchant();
  await merchant.selectAll();
  const merchantType = new MerchantType();
  await merchantType.selectAll();

  const lines = await readFile('expenses_update_data.txt');

  // See why I gathered data like this:
  // https://stackoverflow.com/a/37576787
  const result = [];
  for (const line of lines) {
    result.push(await parse(line, merchant, merchantType));
  }

  console.log('result: ', result);
}

async function parse(line, merchant, merchantType) {
  const [date, name, cost] = line.split('|');
  return await input({
    date,
    cost,
    name,
  }, merchant, merchantType);
}


async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString().split('\n').filter((line) => line !== '');
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

main();
