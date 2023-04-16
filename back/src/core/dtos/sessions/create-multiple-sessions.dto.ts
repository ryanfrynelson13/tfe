import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, ValidateNested } from "class-validator";

class DatesInfo {
    @IsArray()
    openDays: number[]

    @IsString()
    startTime: string

    @IsString()
    closeTime: string
}

export class CreateMultipleSessionsDto {
    @IsInt()
    eventId: number

    @ValidateNested()
    @Type(() => DatesInfo)
    datesInfo: DatesInfo
}

