import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from 'src/core/models/entities/user.entity';
import { PermissionEntity } from 'src/core/models/entities/permission.entity';
import { AddressUserEntity } from 'src/core/models/entities/address-user.entity';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { EventLocationEntity } from 'src/core/models/entities/event-location.entity';
import { CategoryEntity } from 'src/core/models/entities/category.entity';
import { ReviewEntity } from 'src/core/models/entities/review.entity';
import { UsersService } from "src/core/services/users/users.service";
import { AuthService } from "src/core/services/auth/auth.service";
import { EventsService } from "src/core/services/events/events.service";
import { TicketPriceEntity } from "./models/entities/ticket-price.entity";
import { SessionEntity } from "./models/entities/sessions.entity";
import { SaleEntity } from "./models/entities/sale.entity";
import { TicketEntity } from "./models/entities/ticket.entity";
import { TestsService } from "./services/tests/tests.service";

@Module({
    exports: [
        UsersService,
        AuthService,
        EventsService,
        TestsService
    ],
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            PermissionEntity,
            AddressUserEntity,
            EventEntity,
            EventLocationEntity,
            CategoryEntity,
            ReviewEntity,
            TicketPriceEntity,
            SessionEntity,
            SaleEntity,
            TicketEntity
        ]),
    ],
    providers: [
        UsersService,
        AuthService,
        EventsService,
        TestsService
    ]    
})
export class CoreModule{}