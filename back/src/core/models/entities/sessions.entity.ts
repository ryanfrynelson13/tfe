import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./Event.entity";


@Entity('sessions')
export class SessionEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'timestamp',
        name: 'start_time'
    })
    startTime: string

    @Column({
        type: 'int',
        name: 'places_left'
    })
    placesLeft: number

    @ManyToOne(() => EventEntity, (event) => event.id)
    event: EventEntity
}