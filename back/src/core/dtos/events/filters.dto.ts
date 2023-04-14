import { IsArray, IsNumber } from "class-validator";

export class FiltersDto{
    @IsArray()
    categories: number[]

    @IsArray()
    priceRange: [number, number]

    @IsNumber()
    lowestStars: number
}