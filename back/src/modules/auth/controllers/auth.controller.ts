import {  Body, Controller, Get, Post  } from '@nestjs/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RegisterUser } from 'src/core/dtos/auth/register-user.dto';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
    
    @Post('register')
    register(
        @Body() body: RegisterUser
    ){
        return this.authService.register(body.user, body.permissionId) 
    }

    @Post('login')
    login(
        @Body() body: any
    ){
        return this.authService.login(body)
    }
}
