import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./Event.entity";


@Entity('categories')
export class CategoryEntity{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    category: string

    @OneToMany(() => EventEntity, (event) => event.category)
    event: EventEntity[]
}