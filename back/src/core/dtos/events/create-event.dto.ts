import { IsString, IsInt, IsOptional, IsDateString, ValidateNested} from "class-validator"
import { Type } from "class-transformer"
import { EventDto } from "./event.dto"


export class CreateEventDto {
    
    @ValidateNested()
    @Type(() => EventDto)
    event: EventDto

    @IsInt()
    categoryId: number

    @IsInt()
    locationId: number
}