import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsModule } from './positions/positions.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Position } from './positions/entities/position.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: 
  [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
        ssl: !!parseInt(configService.get('DATABASE_SSL')),
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Position]),
    UsersModule,
    PositionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
