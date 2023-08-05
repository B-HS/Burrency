import { TypeOrmModule } from '@nestjs/typeorm';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('currency')
export class Currency {
    @PrimaryGeneratedColumn('increment')
    cid: number;

    @Column()
    code: string;

    @Column()
    KRW: number;
    
    @Column()
    USD: number;

    @Column()
    JPY: number;
        
    @CreateDateColumn({ type: 'datetime' })
    insertDt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updateDt: Date
}

export const CurrencyEntity = TypeOrmModule.forFeature([Currency])