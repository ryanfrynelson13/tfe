import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { AddressUserEntity } from "./address-user.entity";
import { EventEntity } from "./Event.entity";
import { ReviewEntity } from "./review.entity";

@Entity('users')
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        type: 'varchar',
        length: 68,
        nullable: false
    })
    password: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    username: string

    @ManyToOne(() => PermissionEntity, (permission) => permission.id)
    permission: PermissionEntity

    @OneToMany(() => AddressUserEntity, addresses => addresses.user)
    addresses: AddressUserEntity[]

    @ManyToMany(() => EventEntity)
    @JoinTable()
    favorites: EventEntity[]

    @OneToMany(() => ReviewEntity, (reviews) => reviews.user)
    reviews: ReviewEntity[]
}