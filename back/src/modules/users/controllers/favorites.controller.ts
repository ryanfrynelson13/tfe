import { Controller, Patch, Body, Get, Param, UseGuards, Post } from '@nestjs/common';
import { AddFavoriteDto } from 'src/core/dtos/favorites/add-favorite.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { FavoritesService } from 'src/core/services/favorites/favorites.service';


@UseGuards(AuthGard)
@Controller('users/:userId/favorites')
export class FavoritesController {

    constructor(
        private readonly favoritesService: FavoritesService
    ){}

    @Get('')
    getAllFavorites(
        @Param('userId') userId: number
    ){
        return this.favoritesService.findAllFavorites(userId)
    }
    
    @Post('')
    addToFavorites(
        @Param('userId') userId: number,
        @Body() body: AddFavoriteDto
    ){
        return this.favoritesService.addToFavorites(userId, body.eventId)
    }

   
}
