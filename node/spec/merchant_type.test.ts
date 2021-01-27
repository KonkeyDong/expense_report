import {MerchantType} from '../src/classes/merchant_type';
import createDummyTable from './create_dummy_table';

describe('MerchantType', () => {
  const table = 'dummy_merchant_type';
  let merchantType = undefined;

  beforeAll(async (done) => {
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // disable console.warn

    merchantType = new MerchantType();
    const tableDefinition = await merchantType.pool.query('describe merchant_type');
    const query = createDummyTable(table, tableDefinition[0]);
    // console.log('query: ', query);
    await merchantType.pool.query(query);
    done();
  }, 10000);

  afterAll(async (done) => {
    merchantType = new MerchantType();
    merchantType.table = table;
    await merchantType.pool.query(`DROP TABLE ${table}`);
    done();
  }, 10000);

  beforeEach(async (done) => {
    merchantType = new MerchantType();
    merchantType.table = table;
    done();
  }, 10000);

  describe('.insert()', () => {
    test('insert ID returned will be 1', async (done) => {
      expect((await merchantType.insert('bologna'))).toBe(1);
      done();
    }, 30000);

    test('handle duplicate key', async (done) => {
      expect((await merchantType.insert('bologna'))).toBe(undefined);
      done();
    }, 30000);

    test('next insert ID will be 3', async (done) => {
      expect((await merchantType.insert('phony'))).toBe(3); // mysql design decision...
      done();
    }, 30000);
  });

  describe('.select()', () => {
    test('finds a record', async (done) => {
      expect((await merchantType.select(1))).toStrictEqual({merchant_type_id: 1, name: 'bologna'});
      done();
    }, 30000);

    test('no record found', async (done) => {
      expect((await merchantType.select(9999999))).toBe(undefined);
      expect((await merchantType.select(-1))).toBe(undefined);
      done();
    }, 30000);
  });

  describe('.selectAll()', () => {
    test('Return all table entries', async (done) => {
      expect((await merchantType.selectAll())).toStrictEqual([
        {
          merchant_type_id: 1,
          name: 'bologna',
        },
        {
          merchant_type_id: 3,
          name: 'phony',
        },
      ]);
      done();
    }, 30000);
  });

  describe('.update()', () => {
    test('update "bologna" to "banana"', async (done) => {
      expect(await merchantType.update('banana', 1)).toBe(true);
      expect(await merchantType.select(1)).toStrictEqual({merchant_type_id: 1, name: 'banana'});
      done();
    }, 30000);

    test('does not update if invalid ID', async (done) => {
      expect(await merchantType.update('bogus', 9999999999)).toBe(false);
      done();
    }, 30000);
  });

  describe('.delete()', () => {
    test('remove a record', async (done) => {
      expect(await merchantType.select(1)).toStrictEqual({merchant_type_id: 1, name: 'banana'});
      expect(await merchantType.delete(1)).toBe(true);
      expect(await merchantType.select(1)).toBe(undefined);
      done();
    }, 30000);
  });
});
