import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Role } from '../../common/enums/role.enum.js';
import { Rating } from '../../ratings/entities/rating.entity.js';
import { Store } from '../../stores/entities/store.entity.js';
import { User } from '../../users/entities/user.entity.js';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'storepulse',
  password: process.env.DB_PASSWORD ?? 'storepulse',
  database: process.env.DB_NAME ?? 'storepulse',
  entities: [User, Store, Rating],
  synchronize: false,
});

async function seedAdmin(): Promise<void> {
  await dataSource.initialize();
  try {
    const repository = dataSource.getRepository(User);
    const email = (process.env.ADMIN_EMAIL ?? 'admin@storepulse.local').trim().toLowerCase();
    const existingAdmin = await repository.findOne({ where: { email } });

    if (existingAdmin) {
      console.log(`Admin already exists: ${email}`);
      return;
    }

    const password = process.env.ADMIN_PASSWORD ?? 'Admin@1234';
    const admin = repository.create({
      name: process.env.ADMIN_NAME ?? 'StorePulse Admin',
      email,
      password: await bcrypt.hash(password, 12),
      address: process.env.ADMIN_ADDRESS ?? 'StorePulse HQ',
      role: Role.ADMIN,
    });
    await repository.save(admin);
    console.log(`Admin created: ${email}`);
  } finally {
    await dataSource.destroy();
  }
}

await seedAdmin();
