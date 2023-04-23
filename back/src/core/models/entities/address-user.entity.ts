import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity('user_addresses')
export class AddressUserEntity {

    @PrimaryGeneratedColumn()
    id: number

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

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity
}