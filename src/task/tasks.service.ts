import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { AppService } from 'src/app/app.service';
import { parseHTML } from './parseUtil';

export interface currencyAxios {
    meta: { last_updated_at: string };
    data: {
        [key: string]: {
            code: string;
            value: number;
        };
    };
}

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    @Inject(AppService)
    private readonly appService: AppService;

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        try {
            const { data } = await axios.get('https://finance.naver.com/marketindex/exchangeList.naver')
            const { USD, JPY } = parseHTML(data)
            this.appService.create('SUCCESS', USD, JPY)
        } catch (error) {
            const result = await this.appService.findLastOne()
            const { JPY, USD } = result[0]
            this.appService.create('ERROR', USD, JPY)
        }
    }
}