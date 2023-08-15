import { TypeOrmModule } from '@nestjs/typeorm';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('currency')
export class Currency {
    @PrimaryGeneratedColumn('increment')
    cid: number;

    @Column()
    code: string;

    @Column({ nullable: true })
    KRW: number;

    @Column({ nullable: true })
    USD: number;

    @Column({ nullable: true })
    JPY: number;

    @Column({ nullable: true })
    EUR: number

    @Column({ nullable: true })
    CNY: number

    @Column({ nullable: true })
    HKD: number

    @Column({ nullable: true })
    TWD: number

    @Column({ nullable: true })
    GBP: number

    @Column({ nullable: true })
    OMR: number

    @Column({ nullable: true })
    CAD: number

    @Column({ nullable: true })
    CHF: number

    @Column({ nullable: true })
    SEK: number

    @Column({ nullable: true })
    AUD: number

    @Column({ nullable: true })
    NZD: number

    @Column({ nullable: true })
    CZK: number

    @Column({ nullable: true })
    CLP: number

    @Column({ nullable: true })
    TRY: number

    @Column({ nullable: true })
    MNT: number

    @Column({ nullable: true })
    ILS: number

    @Column({ nullable: true })
    DKK: number

    @Column({ nullable: true })
    NOK: number

    @Column({ nullable: true })
    SAR: number

    @Column({ nullable: true })
    KWD: number

    @Column({ nullable: true })
    BHD: number

    @Column({ nullable: true })
    AED: number

    @Column({ nullable: true })
    JOD: number

    @Column({ nullable: true })
    EGP: number

    @Column({ nullable: true })
    THB: number

    @Column({ nullable: true })
    SGD: number

    @Column({ nullable: true })
    MYR: number

    @Column({ nullable: true })
    IDR: number

    @Column({ nullable: true })
    QAR: number

    @Column({ nullable: true })
    KZT: number

    @Column({ nullable: true })
    BND: number

    @Column({ nullable: true })
    INR: number

    @Column({ nullable: true })
    PKR: number

    @Column({ nullable: true })
    BDT: number

    @Column({ nullable: true })
    PHP: number

    @Column({ nullable: true })
    MXN: number

    @Column({ nullable: true })
    BRL: number

    @Column({ nullable: true })
    VND: number

    @Column({ nullable: true })
    RUB: number

    @Column({ nullable: true })
    HUF: number

    @Column({ nullable: true })
    PLN: number

    @Column({ nullable: true })
    LKR: number

    @Column({ nullable: true })
    DZD: number

    @Column({ nullable: true })
    KES: number

    @Column({ nullable: true })
    COP: number

    @Column({ nullable: true })
    TZS: number

    @Column({ nullable: true })
    NPR: number

    @Column({ nullable: true })
    RON: number

    @Column({ nullable: true })
    LYD: number

    @Column({ nullable: true })
    MOP: number

    @Column({ nullable: true })
    MMK: number

    @Column({ nullable: true })
    ETB: number

    @Column({ nullable: true })
    UZS: number

    @Column({ nullable: true })
    KHR: number

    @Column({ nullable: true })
    FJD: number

    @CreateDateColumn({ type: 'datetime' })
    insertDt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updateDt: Date
}

export const CurrencyEntity = TypeOrmModule.forFeature([Currency])