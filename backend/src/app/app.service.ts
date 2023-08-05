import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from './entity/currency.entity';
import { Repository } from 'typeorm';

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
        if (Number.isInteger(Number(num))) {
            return this.currencyRepository.find({ take: Number(num) })
        }
        return { state: false }
    }
}
