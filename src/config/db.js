import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';

const { Pool } = pkg;

import log from './winston.js';
import config from './index.js';

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const db = drizzle(pool);

log.info(`Connected to database`);

export default db;
