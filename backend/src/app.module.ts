import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Rating } from './ratings/entities/rating.entity.js';
import { Store } from './stores/entities/store.entity.js';
import { User } from './users/entities/user.entity.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'storepulse'),
        password: configService.get<string>('DB_PASSWORD', 'storepulse'),
        database: configService.get<string>('DB_NAME', 'storepulse'),
        entities: [User, Store, Rating],
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
