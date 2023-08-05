import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AppService } from 'src/app/app.service';
import { CurrencyEntity } from 'src/app/entity/currency.entity';

@Module({
    imports: [CurrencyEntity],
    providers: [TasksService, AppService],
})
export class TasksModule { }