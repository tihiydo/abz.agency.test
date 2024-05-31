import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { file } from "../schemas/index"
import { buffer } from 'stream/consumers';
import { promises as fs } from 'fs';
import { badResponse, generateRandomString, isValidDto } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/positions/entities/position.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const sharp = require('sharp');
const tinify = require("tinify");

const imageFileFilter = (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => 
{
    if (!file.mimetype.match(/\/(jpg|jpeg)$/)) 
    {
        return callback(new BadRequestException('Only JPEG/JPG files are allowed!'), false);
    }
    if(file.size > 4500000)
    {
        return callback(new BadRequestException('Can`t load this file'), false);
    }
    callback(null, true);
};

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,) {}

  
    @Post()
    @UseInterceptors(FileInterceptor('photo', 
    {
        storage: diskStorage({
          destination: './temp',
          filename: async (req, file, callback) => 
          {
            const body : RegisterUserDto = req.body
            if(isValidDto(RegisterUserDto, body))
            {
                const ext = extname(file.originalname);
                return callback(null, `${body.email.split("@")[0]}.temp`);
            }
            else
            {
                return callback(new BadRequestException('Please enter data'), undefined);
            }
          },
        }),
        fileFilter: imageFileFilter,
    }))
    async register(@Body() registerUserDto: RegisterUserDto, @Res() res : Response) 
    {
        let photo : string;
        if(fs.access(`./temp/${registerUserDto.email.split("@")[0]}.temp`))
        {
            const metadata = await sharp(`./temp/${registerUserDto.email.split("@")[0]}.temp`).metadata();
            if(metadata.width < 70 || metadata.height < 70)
            {
                badResponse(res, "Image must be larger")
                return
            }
            tinify.key = "k8dj7Rxz16qMCFNSHXPzHTfhQ873T57j";
            const source = await tinify.fromFile(`./temp/${registerUserDto.email.split("@")[0]}.temp`);

            const resized = await source.resize
            ({
                method: "cover",
                width: 70,
                height: 70
            });

            photo = `${generateRandomString(6)}.jpg`
            await resized.toFile(`./photos/${photo}`);
        }

        await this.usersService.register(res, registerUserDto, photo);
    }

    @Get()
    list(@Query() query : {page: string, count : string}, @Res() res : Response) 
    {
        return this.usersService.list(res, +query.page, +query.count);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res : Response) 
    {
        return this.usersService.findOne(res, +id);
    }
}