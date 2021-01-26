
import {MerchantType} from './merchant_type';
import {Expenses} from './expenses';
import {Merchant} from './merchant';

// const { Pool } = pkg;
async function main() {
  const expenses = new Expenses();
  const data = await expenses.select(1);
  // console.log('type: ', typeof purchase_date, '  |  data: ', purchase_date);
  console.log('data: ', data);
  // const merchantType = new MerchantType();
  // const x = await merchantType.select(1);
  // const x = await merchantType.selectAll();

  // const x = await merchantType.selectAll();
  // const x = await merchantType.update(12, 'clam');
  // console.log('result: ', x);

  // merchantType.finish();
}

main();
