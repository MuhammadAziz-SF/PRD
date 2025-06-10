import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/prdjobsearch',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;
