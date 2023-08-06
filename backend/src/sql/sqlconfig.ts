import { TypeOrmModule } from "@nestjs/typeorm"

const SqlConfig = () => TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'burrency.db',
    autoLoadEntities: true,
    synchronize: true,
    logging: true
})

export default SqlConfig