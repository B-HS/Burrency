import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContriesList } from 'src/task/parseUtil';
import { Repository } from 'typeorm';
import { Currency } from './entity/currency.entity';

@Injectable()
export class AppService {
    constructor(@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>) { }

    create(code: string, curs: ContriesList) {
        return this.currencyRepository.save({ code, KRW: 1000, ...curs })
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
