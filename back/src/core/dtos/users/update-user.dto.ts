import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    firstname: string

    @IsOptional()
    @IsString()
    lastname: string
}