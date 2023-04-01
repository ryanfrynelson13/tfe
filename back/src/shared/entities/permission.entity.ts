import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('permissions')
export class PermissionEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        unique: true
    })
    title: string

    @Column({
        type: 'boolean',
        default: false,
        name: 'can_create'
    })
    canCreate: boolean

    @Column({
        type: 'boolean',
        default: false,
        name: 'can_update'
    })
    canUpdate: boolean

    @Column({
        type: 'boolean',
        default: false,
        name: 'can_save'
    })
    canSave: boolean
}