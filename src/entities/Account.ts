import {Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, ManyToMany, JoinTable, Generated} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Branch} from "./Branch";
import {Customer} from "./Customer";

export enum AccountType {
    SAVING = "saving",
    CURRENT = "current"
}

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    @Generated('increment')
    @Index()
    accountNo: number;
    @Column({type: "enum", enum: AccountType})
    accountType: AccountType;
    @Column({default: 0})
    balance: number;
    @Column({nullable: true})
    nominee: string;
    @ManyToOne(type => Branch, branch => branch.accounts)
    branch: Branch;
    @ManyToMany(type => Customer, customer => customer.accounts)
    @JoinTable()
    customers: Customer[];
}