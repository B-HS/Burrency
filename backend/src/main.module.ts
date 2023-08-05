import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppModule } from './app/app.module';
import SqlConfig from './sql/sqlconfig';
import { TasksModule } from './task/tasks.module';
@Module({
    imports: [
        ScheduleModule.forRoot(),
        TasksModule,
        AppModule,
        SqlConfig()
    ]
})
export class MainModule { }
