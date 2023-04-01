import { IsString, IsInt, IsOptional, IsDateString} from "class-validator"


export class CreateEventDto {
    
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

    @IsString()
    duration: string

    @IsInt()
    places: number
}