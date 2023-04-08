import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/core/models/entities/category.entity";
import { Repository } from "typeorm";


@Injectable()
export class CategoriesService{

    constructor(
        @InjectRepository(CategoryEntity) private categoriesRepo: Repository<CategoryEntity>
    ){}

    getAllCategories(){
        return this.categoriesRepo.find({})
    }

    async getCategoryEvents(id: number){
        
        const category = await this.categoriesRepo.findOne({
            where: {
                id: id
            },
            relations: ['events.tickets', 'events.reviews']
        })

        if(!category){
            throw new NotFoundException('category does not exist')
        }

        return category
    }
       
}