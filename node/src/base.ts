import mysql from 'mysql2/promise';

interface IQueryConfig {
    sql: string; // the raw query text
    values?: Array<any>; // an array of query parameters
    name?: string; // name of the query - used for prepared statements
}

export abstract class Base {
  pool = undefined
  table = undefined; // defined in child
  idColumnName = undefined // defined in child

  constructor(pool?) {
    if (pool) {
      this.pool = pool;
    } else {
      this.pool = mysql.createPool({
        connectionLimit: 10,
        user: 'mysql',
        host: '172.20.0.2',
        database: 'expense_report',
        password: 'password',
        port: 3306,
      });
    }
  }

  protected async executor(config: IQueryConfig) {
    try {
      const results = await this.pool.query(config);
      return results[0]; // success
    } catch (error) {
      console.log(error.sqlMessage);
      return false; // fail
    }
  }

  protected async transaction(config: IQueryConfig) {
    const connection = await this.pool.getConnection();
    connection.beginTransaction();

    try {
      await connection.query(config);
      await connection.commit();
      return true; // update successful
    } catch (error) {
      await connection.rollback();
      console.log(error.sqlMessage);
      return false; // update fail
    } finally {
      connection.release();
    }
  }

  protected async selector(config: IQueryConfig) {
    const results = await this.pool.query(config);
    if (results[0].length < 1) {
      return [undefined]; // fail as array for selectAll() query
    }

    // remove the TextRow type that's inherit from the mysql2 library
    return results[0].map((result) => Object.assign({}, result));
  }

  public async selectAll() {
    return await this.selector({
      sql: `SELECT * FROM ${this.table}`,
    });
  }

  protected buildConfig(keyword, id) {
    return {
      sql: `${keyword} * FROM ${this.table} WHERE ${this.idColumnName} = ?`,
      values: [id],
    };
  }

  finish() {
    this.pool.end();
  }
}
