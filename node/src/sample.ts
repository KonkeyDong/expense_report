// import { Base } from './base.js';
import { Merchant } from './merchant'
// import { Trie } from './trie'

import sjcl from 'sjcl'

import { Expenses } from './expenses'

// import { to } from 'await-to-js'

import { Pool } from 'pg'

import mysql from 'mysql'

// const { Pool } = pkg;
async function main () {
  // const pool = new Pool({
  //   user: 'postgres',
  //   host: '172.17.0.1',
  //   database: 'postgres',
  //   password: 'password',
  //   port: 5432
  // })

  //   const t = new Trie([
  //     {
  //       merchantId: 1,
  //       name: 'american eagle',
  //       merchantTypeId: 1
  //     },
  //     {
  //       merchantId: 2,
  //       name: 'american century insurance',
  //       merchantTypeId: 2
  //     },
  //     {
  //       merchantId: 3,
  //       name: 'american cush',
  //       merchantTypeId: 3
  //     }
  //   ])

  //   // t.display();
  //   console.log(t.find('american eagle'))
  //   console.log(t.find('american amz'))
  //   console.log('partialListing: ', t.getPartialMatchings())

  // const merchant = new Merchant(pool)
  // console.log('merchant row: ', await merchant.selectAll())
  // console.log('new merchant id is: ', await merchant.insert('this is a test', 1))
  // await merchant.update(9, 'this is an update')
  // await merchant.delete(9)
  //   await merchant.delete(6)
  //   console.log('merchant: ', merchant.name)
  //   const result = (await merchant.getMerchantById(1))
  //   // const result = await merchant.getAllMerchants();
  //   console.log(result)

  // const bit = sjcl.hash.sha256.hash('this is a test')
  // const hash = sjcl.codec.hex.fromBits(bit)
  // console.log('hash: ', hash)
  // console.log('length: ', hash.length)

  // const merchant = new Merchant()
  // console.log('test')
  // const x = await merchant.pool.query('select * from dummy_merchant')
  //   .then(results => results.rows)
  //   .catch(error => error.stack)
  // // await merchant.cacheMerchantTypeMap()
  // console.log('data: ', x)
  // console.log('reverse: ', merchant.reverseObject(merchant.merchantTypeMap))

  // const expenses = new Expenses()
  // expenses.insert({
  //   purchaseDate: '2020-01-08',
  //   merchantId: 1,
  //   cost: 123.45,
  //   note: undefined,
  //   hashCode:
  // })

  // pool.end()

  const connection = mysql.createConnection({
    host: '172.21.0.3',
    user: 'mysql',
    password: 'password',
    database: 'expense_report'
  })

  connection.connect()

  connection.query('SELECT * from test', function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results[0])
  })

  connection.end()
}

main()
