import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Rating } from './ratings/entities/rating.entity.js';
import { Store } from './stores/entities/store.entity.js';
import { User } from './users/entities/user.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USERNAME ?? 'storepulse',
      password: process.env.DB_PASSWORD ?? 'storepulse',
      database: process.env.DB_NAME ?? 'storepulse',
      entities: [User, Store, Rating],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
