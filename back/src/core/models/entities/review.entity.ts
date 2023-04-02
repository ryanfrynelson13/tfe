import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { EventEntity } from "./Event.entity";


@Entity('reviews')
@Index(['event', 'user'], {unique: true})
export class ReviewEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'float',
        nullable: false
    })
    stars: number

    @Column({
        type: 'text',
        nullable: true
    })
    comment: string

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @ManyToOne(() => EventEntity, (event) => event.id)
    event: EventEntity

    
}