import { Controller, Patch, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddFavoriteDto } from 'src/shared/dtos/users/add-favorite.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Get('favorites/:id')
    getAllFavorites(
        @Param('id') id: number
    ){
        return this.usersService.findAllFavorites(id)
    }
    
    @Patch('favorites')
    addToFavorites(
        @Body() body: AddFavoriteDto
    ){
        const {userId, eventId} = body
        return this.usersService.addToFavorites(userId, eventId)
    }
}
