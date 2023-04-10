import { Body, Controller, Delete, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { NewReviewDto } from 'src/core/dtos/reviews/new-review.dto';
import { UpdateReviewDto } from 'src/core/dtos/reviews/update-review.dto';
import { AuthGard } from 'src/core/guards/auth.guard';
import { ReviewsService } from 'src/core/services/reviews/reviews.service';


@Controller('reviews')
export class ReviewsController {

    constructor(
        private reviewsService: ReviewsService
    ){}
    
    @UseGuards(AuthGard)
    @Post()
    createReview(
        @Request() req,
        @Body() body: NewReviewDto
    ){
        const {review, eventId} = body
        return this.reviewsService.createReview(review, req.user.id, eventId)
    }

    
    @UseGuards(AuthGard)
    @Patch()
    updateReview(
        @Request() req,
        @Body() body: UpdateReviewDto
    ){
        const userId = req.user.id
        const {id, review} = body
        return this.reviewsService.updateReview(userId, id, review)
    }

    @UseGuards(AuthGard)
    @Delete(':id')
    deleteReview(
        @Param('id') id: number
    ){
        return this.reviewsService.deleteReview(id)
    }


}
