import { Type } from "class-transformer";
import { IsInt, ValidateNested } from "class-validator";
import { ReviewDto } from "./review.dto";


export class NewReviewDto{

    @ValidateNested()
    @Type(() => ReviewDto)
    review: ReviewDto

    @IsInt()
    eventId: number
}