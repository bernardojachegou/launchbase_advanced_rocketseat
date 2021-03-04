const { Pool } = require('pg');

const db_name = 'LaunchStore - Launch Base Modules';

module.exports = new Pool({
  user: 'postgres',
  password: 'defcon4',
  host: 'localhost',
  port: '5432',
  database: db_name,
});
