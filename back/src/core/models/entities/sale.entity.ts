import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { UserEntity } from "./user.entity";


@Entity('sales')
export class SaleEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'timestamp',
        default: new Date(),
        name: 'created_at'
    })
    createdAt: string

    @Column({
        type: 'float',
        name: 'total_price',
        nullable: true
    })
    totalPrice: number

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @OneToMany(() => TicketEntity, (tickets) => tickets.sale)
    tickets: TicketEntity[]

}