import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventLocationEntity } from "./event-location.entity";
import { CategoryEntity } from "./category.entity";
import { TicketPriceEntity } from "./ticket-price.entity";
import { SessionEntity } from "./sessions.entity";
import { ReviewEntity } from "./review.entity";
import { UserEntity } from "./user.entity";


@Entity('events')
export class EventEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string

    @Column({
        type: 'varchar',
        default: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        name: 'image_url'
    })
    imageUrl: string

    @Column({
        type: 'date',
        default: new Date(),
        name: 'start_date'
    })
    startDate: string

    @Column({
        type: 'date',
        default: new Date(),
        name: 'end_date'
    })
    endDate: string

    @Column({
        type: 'text'
    })
    intro: string 

    @Column({
        type: 'text'
    })
    description: string 

    @Column({
        type: 'int',
        nullable: true
    })
    duration: number

    @Column({
        type: 'int'
    })
    places: number

    @ManyToOne(() => EventLocationEntity, (location) => location.id)
    location: EventLocationEntity

    @ManyToOne(() => CategoryEntity, (category) => category.id)
    category: CategoryEntity

    @OneToMany(() => TicketPriceEntity, (tickets) => tickets.event)
    tickets: TicketPriceEntity[]

    @OneToMany(() => SessionEntity, (sessions) => sessions.event)
    sessions: SessionEntity[]

    @OneToMany(() => ReviewEntity, (reviews) => reviews.event)
    reviews: ReviewEntity[]

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity

}