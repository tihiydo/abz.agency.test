import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Position } from 'src/positions/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Position])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
