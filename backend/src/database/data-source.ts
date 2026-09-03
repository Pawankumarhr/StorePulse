import 'dotenv/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataSource } from 'typeorm';
import { Rating } from '../ratings/entities/rating.entity.js';
import { Store } from '../stores/entities/store.entity.js';
import { User } from '../users/entities/user.entity.js';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'storepulse',
  password: process.env.DB_PASSWORD ?? 'storepulse',
  database: process.env.DB_NAME ?? 'storepulse',
  entities: [User, Store, Rating],
  migrations: [join(dirname(fileURLToPath(import.meta.url)), 'migrations/*.{ts,js}')],
  synchronize: false,
});
