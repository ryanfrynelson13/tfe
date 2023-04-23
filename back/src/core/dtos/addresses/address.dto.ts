import { IsString } from "class-validator";

export class AddressDto{

    @IsString()
    country: string

    @IsString()
    postalCode: string

    @IsString()
    number: string

    @IsString()
    street: string
}