
import {MerchantType} from './classes/merchant_type';
import {Expenses} from './classes/expenses';
import {Merchant} from './classes/merchant';
import {input} from './input';

const fs = require('fs').promises;


async function main() {
  const merchant = new Merchant();
  await merchant.selectAll();
  const merchantType = new MerchantType();
  await merchantType.selectAll();
  const expenses = new Expenses();

  const lines = await readFile('expenses_update_data.txt');

  // See why I gathered data like this:
  // https://stackoverflow.com/a/37576787

  // const result = [];
  // result.push(await input({
  //   date: '2020-12-8',
  //   cost: '1.00',
  //   name: 'parking meter',
  // }, merchant, merchantType));
  for (const line of lines) {
    const insertData = await parse(line, merchant, merchantType);
    expenses.insert(insertData);
  }

  console.log('FINISHED');
  return 0;
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
