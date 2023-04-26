import { IsString } from "class-validator"


export class LocationDto{
    @IsString()
    name: string
    @IsString()
    country: string
    @IsString()
    postalCode: string
    @IsString()
    number: string
    @IsString()
    street: string
}