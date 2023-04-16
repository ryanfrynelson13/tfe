import { IsString, IsInt, IsOptional, IsDateString} from "class-validator"


export class updateEventDto {
    
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    imageUrl: string

    @IsDateString()
    @IsOptional()
    startDate: string
    
    @IsOptional()
    @IsDateString()
    endDate: string

    @IsOptional()
    @IsString()
    intro: string 

    @IsOptional()
    @IsString()
    description: string 

    @IsOptional()
    @IsInt()
    duration: number

    @IsOptional()
    @IsInt()
    places: number
}

