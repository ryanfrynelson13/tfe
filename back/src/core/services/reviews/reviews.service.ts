import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewDto } from 'src/core/dtos/reviews/review.dto';
import { EventEntity } from 'src/core/models/entities/event.entity';
import { ReviewEntity } from 'src/core/models/entities/review.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        @InjectRepository(ReviewEntity) private reviewRepo: Repository<ReviewEntity>
    ){}

    async createReview(review: ReviewDto, userId: number, eventId: number ){
        const newReview: ReviewEntity = await this.reviewRepo.create(review)

        const user = await this.userRepo.findOne({where:{id: userId}})
        const event = await this.eventRepo.findOne({where:{id: eventId}})
        
        if(!user || !event){
            throw new NotFoundException()
        }

        newReview.user = user
        newReview.event = event

        return this.reviewRepo.save(newReview)
    }

    async updateReview(userId: number, reviewId: number, review: ReviewDto) {
        const reviewToUpdate = await this.reviewRepo.findOne({
            where:{
                id: reviewId
            },
            relations: ['user']
        })

        if(userId !== reviewToUpdate.user.id){
            throw new UnauthorizedException()
        }

        const updatedReview = Object.assign(reviewToUpdate, review)

        return this.reviewRepo.save(updatedReview)
    }

    deleteReview(id: number){
        return this.reviewRepo.delete(id)
    }
}