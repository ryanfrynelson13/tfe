import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { type } from "os";


@Entity('categories')
export class CategoryEntity{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    category: string

    @Column({
        type:'varchar',
        name: 'image_url',
        nullable: true
    })
    imageUrl: string

    @OneToMany(() => EventEntity, (events) => events.category)
    events: EventEntity[]
}