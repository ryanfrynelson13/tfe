import { Controller,Request, Patch, Body, Get, Param, UseGuards, Post, Delete } from '@nestjs/common';
import { AddFavoriteDto } from 'src/core/dtos/favorites/add-favorite.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { FavoritesService } from 'src/core/services/favorites/favorites.service';


@UseGuards(AuthGard)
@Controller('users/favorites')
export class FavoritesController {

    constructor(
        private readonly favoritesService: FavoritesService
    ){}

    @Get('')
    getAllFavorites(
        @Request() req
    ){
        const userId: number = req.user.id
        return this.favoritesService.findAllFavorites(userId)
    }
    
    @Post('')
    addToFavorites(
        @Request() req,
        @Body() body: AddFavoriteDto
    ){
        const userId: number = req.user.id
        return this.favoritesService.addToFavorites(userId, body.eventId)
    }

    @Delete(':eventId')
    removeFtomFavorites(
        @Request() req,
        @Param('eventId') eventId: number
    ){
        const userId: number = req.user.id
        return this.favoritesService.removeFromFavorites(userId, eventId)
    }   
}
