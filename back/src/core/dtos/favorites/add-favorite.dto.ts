import { IsInt } from "class-validator";


export class AddFavoriteDto {
    @IsInt()
    eventId: number
}