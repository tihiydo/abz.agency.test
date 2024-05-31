
import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { IsUkrainePhone } from 'src/validators/is-ukraine-phone.validator';
import { isArrayBuffer } from 'util/types';
    
export class RegisterUserDto 
{
    @IsString()
    @MaxLength(60)
    name: string;

    @IsEmail()
    email: string;

    @IsUkrainePhone()
    phone: string;
  
    @IsNumberString()
    position: number;
}