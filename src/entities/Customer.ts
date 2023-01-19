import {Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Loan} from "./Loan";
import {Account} from "./Account";

export enum genderType {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number
    @Column()
    name: string
    @Column()
    mobileNo: string;
    @Column({type: "enum", enum: genderType})
    gender: genderType;
    @Column({nullable: true})
    alternateMobileNo: string;
    @Column({type: "date"})
    dob: Date;
    @Column()
    address: string;
    @Column({unique: true})
    aadhaarNo: string;
    @ManyToMany(type => Loan, loan => loan.customers)
    loans: Loan[];
    @ManyToMany(type => Account, account => account.customers)
    accounts: Account[];
}