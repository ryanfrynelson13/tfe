import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./Event.entity";


@Entity('ticket_prices')
export class TicketPriceEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    title: string

    @Column({
        type: 'float',
        name: 'price_per_ticket'
    })
    pricePerTicket: number

    @Column({
        type: 'int',
        name: 'nb_places'
    })
    nbPlaces: number

    @ManyToOne(() => EventEntity, (event) => event.id)
    event: EventEntity

}