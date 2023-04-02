import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./sessions.entity";
import { TicketPriceEntity } from "./ticket-price.entity";
import { SaleEntity } from "./sale.entity";


@Entity('tickets')
export class TicketEntity{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => SessionEntity, (session) => session.id)
    session: SessionEntity

    @ManyToOne(() => TicketPriceEntity, (ticketPrice) => ticketPrice.id)
    ticketPrice: TicketPriceEntity

    @ManyToOne(() => SaleEntity, (sale) => sale.id)
    sale: SaleEntity
}