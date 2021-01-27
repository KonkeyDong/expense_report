
import {MerchantType} from './classes/merchant_type';
// import {Expenses} from './expenses';
import {Merchant} from './classes/merchant';
// import {input} from './input';

async function main() {
  const merchant = new Merchant();
  await merchant.selectAll();
  const merchantType = new MerchantType();
  await merchantType.selectAll();


  // const x = await input({
  //   date: '2020-12-21',
  //   name: 'taco johns',
  //   cost: '8.77',
  // }, merchant, merchantType);

  // console.log('x: ', x);
}

main();
