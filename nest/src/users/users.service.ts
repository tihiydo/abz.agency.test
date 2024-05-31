import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { goodResponse } from 'src/utils';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/positions/entities/position.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
    ){} 

    async register(res: Response, registerUserDto: RegisterUserDto, photo?: string) 
    {
        const getRole = await this.positionRepository.findOne({
            where: 
            {
              id: String(registerUserDto.position)
            },
        });


        let user = await this.userRepository.findOne({where: {email: registerUserDto.email}})
        if(user)
        {
            user.name = registerUserDto.name
            user.phone = registerUserDto.phone
            user.photo = photo
            user.email = registerUserDto.email
            user.position = getRole
            goodResponse(res, "User info updated")
        }
        else
        {
            user = this.userRepository.create({name: registerUserDto.name, phone: registerUserDto.phone, email: registerUserDto.email, photo})
            user.position = getRole
            goodResponse(res, "Created new user")
        }
        await this.userRepository.save(user);
    }

    async list(res: Response, page?: number, count?: number) 
    {
        if(!page) page = 0
        if(!count) count = 6
        
        const users = await this.userRepository.find({relations: {position: true}, skip: page * count, take: count})
        goodResponse(res, undefined, {users: users})
    }

    async findOne(res: Response, id: number) 
    {
        const user = await this.userRepository.findOne({where: {id: String(id)}, relations: {position: true}})
        goodResponse(res, undefined, {user: user})
    }
}
