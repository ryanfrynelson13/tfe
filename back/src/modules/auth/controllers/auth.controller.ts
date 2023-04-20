import {  Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors  } from '@nestjs/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RegisterUser } from 'src/core/dtos/auth/register-user.dto';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    register(
        @Body() body: RegisterUser
    ){
        return this.authService.register(body.user, body.permissionId) 
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    login(
        @Body() body: any
    ){
        return this.authService.login(body)
    }
}
