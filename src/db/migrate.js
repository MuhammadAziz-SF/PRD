import { fileURLToPath } from 'url';

import { migrate } from 'drizzle-orm/node-postgres/migrator';

import db from '../config/db.js';
import logger from '../config/winston.js';

const runMigrations = async () => {
  try {
    logger.info('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    logger.info('Migrations completed successfully');
  } catch (error) {
    logger.error('Error running migrations:', error);
    process.exit(1);
  }
};

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
  runMigrations();
}

export default runMigrations;
