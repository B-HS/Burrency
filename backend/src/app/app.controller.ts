import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('/last')
    getLast() {
        return this.appService.findLastOne();
    }

    @Get('/range/:num')
    getRangeDate(@Param() { num }: { num: string }) {
        return this.appService.findAllByAmountOfDay({ num })
    }
}
