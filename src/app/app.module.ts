import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyEntity } from './entity/currency.entity';

@Module({
    imports: [CurrencyEntity],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
