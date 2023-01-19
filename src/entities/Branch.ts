import {Column, PrimaryGeneratedColumn, Entity, Index, ManyToOne, OneToMany} from "typeorm";
import {Bank} from "./Bank";
import {Loan} from "./Loan";
import {BaseEntity} from "./BaseEntity";
import {Account} from "./Account";

@Entity()
export class Branch extends BaseEntity {
    // Address();
    @PrimaryGeneratedColumn()
    @Index()
    id: number
    @Column({})
    name: string;
    @Column()
    address: string
    @ManyToOne(type => Bank, bank => bank.branches)
    bank: Bank;
    @OneToMany((type) => Loan, loan => loan.branch)
    @OneToMany(type => Account, account => account.branch)
    loans: Loan[];
    accounts: Account[];
}