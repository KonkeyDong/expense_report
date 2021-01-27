import {Merchant} from '../src/classes/merchant';
import createDummyTable from './create_dummy_table';

describe('Merchant', () => {
  const table = 'dummy_merchant';
  let merchant = undefined;

  beforeAll(async (done) => {
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // disable console.warn

    merchant = new Merchant();
    const tableDefinition = await merchant.pool.query('describe merchant');
    const query = createDummyTable(table, tableDefinition[0]);
    // console.log('query: ', query);
    await merchant.pool.query(query);
    done();
  }, 10000);

  afterAll(async (done) => {
    merchant = new Merchant();
    merchant.table = table;
    await merchant.pool.query(`DROP TABLE ${table}`);
    done();
  }, 10000);

  beforeEach(async (done) => {
    merchant = new Merchant();
    merchant.table = table;
    done();
  }, 10000);

  describe('.insert()', () => {
    test('insert ID returned will be 1', async (done) => {
      expect((await merchant.insert(1, 'bologna'))).toBe(1);
      done();
    }, 30000);

    test('handle duplicate key', async (done) => {
      expect((await merchant.insert(1, 'bologna'))).toBe(undefined);
      done();
    }, 30000);

    test('next insert ID will be 3', async (done) => {
      expect((await merchant.insert(2, 'phony'))).toBe(3); // mysql design decision...
      done();
    }, 30000);
  });

  describe('.select()', () => {
    test('finds a record', async (done) => {
      expect((await merchant.select(1))).toStrictEqual({merchant_id: 1, name: 'bologna', merchant_type_id: 1});
      done();
    }, 30000);

    test('no record found', async (done) => {
      expect((await merchant.select(9999999))).toBe(undefined);
      expect((await merchant.select(-1))).toBe(undefined);
      done();
    }, 30000);
  });

  describe('.selectAll()', () => {
    test('Return all table entries', async (done) => {
      expect((await merchant.selectAll())).toStrictEqual([
        {
          merchant_id: 1,
          merchant_type_id: 1,
          name: 'bologna',
        },
        {
          merchant_id: 3,
          merchant_type_id: 2,
          name: 'phony',
        },
      ]);
      done();
    }, 30000);
  });

  describe('.update()', () => {
    test('update "bologna" to "banana"', async (done) => {
      expect(await merchant.update(1, 'banana')).toBe(true);
      expect(await merchant.select(1)).toStrictEqual({merchant_type_id: 1, name: 'banana', merchant_id: 1});
      done();
    }, 30000);

    test('does not update if invalid ID', async (done) => {
      expect(await merchant.update(9999999999, 'bogus')).toBe(false);
      done();
    }, 30000);
  });

  describe('.delete()', () => {
    test('remove a record', async (done) => {
      expect(await merchant.select(1)).toStrictEqual({merchant_type_id: 1, name: 'banana', merchant_id: 1});
      expect(await merchant.delete(1)).toBe(true);
      expect(await merchant.select(1)).toBe(undefined);
      done();
    }, 30000);
  });
});
