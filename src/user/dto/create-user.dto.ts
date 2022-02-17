import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "email", default: "user@cargofive.com"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "name", default: "user"})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "password", default: "password"})
    password: string;
}
