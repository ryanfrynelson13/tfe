import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./Event.entity";
import { UserEntity } from "./user.entity";


@Entity('event_locations')
export class EventLocationEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    name: string

    @Column({
        type: 'varchar'
    })
    country: string

    @Column({
        type: 'varchar',
        name: 'postal_code'
    })
    postalCode: string

    @Column({
        type: 'varchar'
    })
    number: string

    @Column({
        type: 'varchar'
    })
    street: string

    @OneToMany(() => EventEntity, (event) => event.location)
    event: EventEntity[]

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity
}