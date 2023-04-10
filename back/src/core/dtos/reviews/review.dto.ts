import { IsNumber, IsOptional, IsString } from "class-validator"

export class ReviewDto {

    @IsNumber()
    stars: number

    @IsOptional()
    @IsString()
    comment: string
}