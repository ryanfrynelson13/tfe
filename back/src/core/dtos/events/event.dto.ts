import { IsString, IsInt, IsOptional, IsDateString} from "class-validator"


export class EventDto {
    
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    imageUrl: string

    @IsDateString()
    @IsOptional()
    startDate: string
    
    @IsDateString()
    endDate: string

    @IsString()
    intro: string 

    @IsString()
    description: string 

    @IsInt()
    duration: number

    @IsInt()
    places: number
}

