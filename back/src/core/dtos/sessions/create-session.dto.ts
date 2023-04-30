import { IsInt, IsString } from "class-validator";


export class CreateSessionDto{

    @IsInt()
    eventId: number

    @IsString()
    startTime: string
}