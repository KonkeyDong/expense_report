const { Pool, Client } = require('pg');

const pool = new Pool({
	user: 'postgres',
	// host: 'http://postgres/',
	host: '172.17.0.1',
	//host: 'localhost',
	database: 'postgres',
	password: 'password',
	port: 5432
});

pool.query('select * from users', (err, res) => {
	console.log('error: ', err);
	console.log('result: ', res.rows[0]);
});

pool.query('select * from users')
	.then(res => console.log('result: ', res.rows[0]))
	.catch(err => console.log('error: ', err));

pool.end();
