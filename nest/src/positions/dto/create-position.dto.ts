import {
IsNotEmpty,
IsString,
MaxLength,
} from 'class-validator';

export class CreatePositionDto 
{
    @IsString()
    @MaxLength(60)
    name: string;
}