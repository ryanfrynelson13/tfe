import {Controller, Get, Param} from '@nestjs/common'
import { CategoriesService } from 'src/core/services/categories/categories.service';

@Controller('categories')
export class CategoriesController{

    constructor(
        private readonly categoriesService: CategoriesService
    ){}

    @Get()
    getAllCategories(){
        return this.categoriesService.getAllCategories()
    }

    @Get(':id')
    getCategory(
        @Param('id') id: number
    ){
        return this.categoriesService.getCategoryEvents(id)
    }
    
}