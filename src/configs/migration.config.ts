import { DataSource } from 'typeorm';

const isDev = process.env.NODE_ENV === 'development';

const PORT = process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: isDev ? ['src/**/*.entity.ts'] : ['dist/**/*.entity.js'],
  migrations: isDev
    ? ['src/infrastructure/database/migrations/*.ts']
    : ['dist/infrastructure/database/migrations/*.js'],
  synchronize: false,
  logging: isDev,
});
