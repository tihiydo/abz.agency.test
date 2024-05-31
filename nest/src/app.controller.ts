import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './positions/entities/position.entity';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  @Get('photo/:imgname')
    seeUploadedFile(@Param('imgname') image : string, @Res() res : Response) 
    {
        return res.sendFile(image, { root: './photos' });
    }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("initial")
  async initial(@Param('id') id: string, @Res() res : Response)
  {
    const positions = [
        { name: 'Lawyer' },
        { name: 'Content manager' },
        { name: 'Security' },
        { name: 'Designer' },
      ];
  
      for (const position of positions) {
        const existingPosition = await this.positionRepository.findOne({ where: { name: position.name } });
        if (!existingPosition) {
          await this.positionRepository.save(position);
        }
        const allPositions = await this.positionRepository.find();
        for (let i = 0; i < 45; i++) {
            const randomPosition = allPositions[Math.floor(Math.random() * allPositions.length)];

            const randomPhoneSuffix = (Math.floor(Math.random() * 10000)).toString().padStart(4, '0');
            const phoneNumber = `+38099533${randomPhoneSuffix}`;
            const user = this.userRepository.create({
              name: faker.name.fullName(),
              email: faker.internet.email(),
              phone: phoneNumber,
              photo: "ySerXz.jpd",
              position: randomPosition,
            });
      
            await this.userRepository.save(user);
          }
      }
  }
  
}
