
import {MerchantType} from './merchant_type';

// const { Pool } = pkg;
async function main() {
  const merchantType = new MerchantType();
  // const x = await merchantType.select(1);
  const x = await merchantType.selectAll();

  // const x = await merchantType.selectAll();
  // const x = await merchantType.update(12, 'clam');
  console.log('result: ', x);

  // merchantType.finish();
}

main();
