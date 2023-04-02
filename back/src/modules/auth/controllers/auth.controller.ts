import {  Body, Controller, Get, Post  } from '@nestjs/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RegisterUser } from 'src/core/dtos/auth/register-user.dto';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
    
    @Post('register')
    async register(
        @Body() body: RegisterUser
    ){
        const newUser = this.authService.register(body.user, body.permissionId) 

        return newUser
    }
}
