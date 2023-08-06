import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from './entity/currency.entity';
import { Between, Repository } from 'typeorm';
import dayjs from 'dayjs';

@Injectable()
export class AppService {
    constructor(@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>) { }

    create(code: string, USD: number, JPY: number) {
        return this.currencyRepository.save({ code, KRW: 1000, USD, JPY })
    }

    findOne(cid: number) {
        return this.currencyRepository.findOneBy({ cid })
    }

    findLastOne() {
        return this.currencyRepository.find({ take: 1, order: { insertDt: { direction: 'DESC' } } })
    }

    findAllByAmountOfDay({ num }: { num: string }) {
        const startDate = new Date()
        const endDate = new Date()
        startDate.setDate(startDate.getDate() - parseInt(num));
        endDate.setDate(endDate.getDate() + 10);
        return this.currencyRepository.createQueryBuilder('entity')
            .where('entity.insertDt BETWEEN :startDate AND :endDate', {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            })
            .orderBy('entity.insertDt', 'DESC')
            .groupBy("strftime('%Y', entity.insertDt)")
            .groupBy("strftime('%m', entity.insertDt)")
            .groupBy("strftime('%d', entity.insertDt)")
            .getMany()
    }
}
