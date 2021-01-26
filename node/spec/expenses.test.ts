import {Expenses, IExpenses} from '../src/expenses';
import createDummyTable from './create_dummy_table';

describe('Expenses', () => {
  const table = 'dummy_expenses';
  let expenses = undefined;

  const dummyData: IExpenses = {
    purchaseDate: '2021-01-01',
    merchantId: 1,
    cost: 123.45,
  };

  beforeAll(async (done) => {
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // disable console.warn

    expenses = new Expenses();
    const tableDefinition = await expenses.pool.query('describe expenses');
    const query = createDummyTable(table, tableDefinition[0]);
    // console.log('query: ', query);
    await expenses.pool.query(query);
    done();
  }, 10000);

  afterAll(async (done) => {
    expenses = new Expenses();
    expenses.table = table;
    await expenses.pool.query(`DROP TABLE ${table}`);
    done();
  }, 10000);

  beforeEach(async (done) => {
    expenses = new Expenses();
    expenses.table = table;
    done();
  }, 10000);

  describe('.insert()', () => {
    test('insert ID returned will be 1', async (done) => {
      expect((await expenses.insert(dummyData))).toBe(1);
      done();
    }, 30000);

    test('handle duplicate key', async (done) => {
      expect((await expenses.insert(dummyData))).toBe(undefined);
      done();
    }, 30000);

    test('next insert ID will be 3', async (done) => {
      const newDummyData = {...dummyData, cost: 543.21};
      expect((await expenses.insert(newDummyData))).toBe(3); // mysql design decision...
      done();
    }, 30000);
  });

  describe('.select()', () => {
    test('finds a record', async (done) => {
      expect((await expenses.select(1))).toStrictEqual({
        expenses_id: 1,
        cost: '123.45',
        note: null,
        hash_code: '106b9124616a06478953c58306e72044cb84096e83ed369377727a11d8184df5',
        merchant_id: 1,
        purchase_date: '2021-01-01',
      });
      done();
    }, 30000);

    test('no record found', async (done) => {
      expect((await expenses.select(9999999))).toBe(undefined);
      expect((await expenses.select(-1))).toBe(undefined);
      done();
    }, 30000);
  });

  describe('.selectAll()', () => {
    test('Return all table entries', async (done) => {
      expect((await expenses.selectAll())).toStrictEqual([{
        expenses_id: 1,
        cost: '123.45',
        note: null,
        hash_code: '106b9124616a06478953c58306e72044cb84096e83ed369377727a11d8184df5',
        merchant_id: 1,
        purchase_date: '2021-01-01',
      },
      {
        expenses_id: 3,
        cost: '543.21',
        note: null,
        hash_code: '97f6d1e9b668775ebf68587611d6ff5360215f377b869fba206ea0d83228050b',
        merchant_id: 1,
        purchase_date: '2021-01-01',
      }]);
      done();
    }, 30000);
  });

  describe('.update()', () => {
    const updatedDummyData = {
      cost: '67.89',
      note: null,
      merchantId: 33,
      purchaseDate: '2014-05-19',
    };

    test('update cost, merchant_id, purchase_date. Method should handle updating the hash_code', async (done) => {
      expect(await expenses.update(3, updatedDummyData)).toBe(true);
      expect(await expenses.select(3)).toStrictEqual({
        expenses_id: 3,
        cost: '67.89',
        note: null,
        hash_code: 'ea1262aa6bd8d3c5646a4d55ab4b838b4302408255d5d67e322e3a0843d6db98',
        merchant_id: 33,
        purchase_date: '2014-05-19',
      });
      done();
    }, 30000);

    test('does not update if invalid ID', async (done) => {
      expect(await expenses.update(9999999999, updatedDummyData)).toBe(false);
      done();
    }, 30000);
  });

  describe('.delete()', () => {
    test('remove a record', async (done) => {
      expect(await expenses.select(1)).toStrictEqual({
        expenses_id: 1,
        cost: '123.45',
        note: null,
        hash_code: '106b9124616a06478953c58306e72044cb84096e83ed369377727a11d8184df5',
        merchant_id: 1,
        purchase_date: '2021-01-01',
      });
      expect(await expenses.delete(1)).toBe(true);
      expect(await expenses.select(1)).toBe(undefined);
      done();
    }, 30000);
  });
});
