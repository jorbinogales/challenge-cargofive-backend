import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsEmail()
    @IsOptional()
    @ApiProperty({ type: "string", description: "email", default: "userUpdate@cargofive.com"})
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string", description: "name", default: "userUpdate"})
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string", description: "password", default: "passwordUpdate"})
    password: string;

}
