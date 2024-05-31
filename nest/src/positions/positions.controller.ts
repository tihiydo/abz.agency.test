import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto'
import { Response } from 'express';

@Controller('positions')
export class PositionsController 
{
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(@Res() res: Response, @Body() createPositionDto: CreatePositionDto) 
  {
    return this.positionsService.create(res, createPositionDto);
  }

  @Get()
  findAll(@Res() res: Response) 
  {
    return this.positionsService.findAll(res);
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) 
  {
    return this.positionsService.remove(res, id);
  }
}
