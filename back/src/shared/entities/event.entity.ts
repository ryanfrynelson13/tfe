import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('events')
export class EventEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
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
        type: 'time'
    })
    duration: string

    @Column({
        type: 'int'
    })
    places: number

}