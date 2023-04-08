import { Controller, Patch, Body, Get, Param, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { UsersService } from '../../../core/services/users/users.service';
import { AuthGard } from 'src/core/guards/auth.guard';
import { UpdateUserDto } from 'src/core/dtos/users/update-user.dto';
import { Request as expressRequest } from 'express';


@UseGuards(AuthGard)
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUser(
        @Request() req){
        const userId = req.user.id
        return this.usersService.getOneUser(userId)
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: number,
        @Body() user: UpdateUserDto
    ){
        return this.usersService.updateUser(id, user)
    }
   
}
