import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { goodResponse } from 'src/utils';

@Injectable()
export class PositionsService {
    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
    ){} 

    create(res : Response, createPositionDto: CreatePositionDto) 
    {
        this.positionRepository.insert(createPositionDto)
        goodResponse(res, "Position is create")
    }

    async findAll(res : Response) 
    {
        const all = await this.positionRepository.find({})
        goodResponse(res, undefined, {positions: all})
    }
    

    async remove(res : Response, id: string) 
    {
        await this.positionRepository.delete({id})
        goodResponse(res, "Position is removed")
    }
}
