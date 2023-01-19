import {Column, PrimaryGeneratedColumn, ManyToOne, Entity, Index, ManyToMany, JoinColumn, JoinTable} from "typeorm";
import {Branch} from "./Branch";
import {BaseEntity} from "./BaseEntity";
import {Customer} from "./Customer";
export enum StatusType{
    PENDING="pending",
    ONGOING="ongoing",
    OVERDUE="overdue",
    PAID="paid"
}
export enum loanType{
    EDUCATION="education",
    HOME="home",
    PERSONAL="personal",
    PROPERTY="property",
    GOLD="gold",
}
@Entity()
export class Loan extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Index()
    id:number;
    @Column({type:"enum",enum:loanType})
    loanType:string;
    @Column()
    amount:number;
    @Column()
    status:StatusType;
    @Column({type:"float"})
    principalAmount:number;
    @Column({type:"float"})
    interestRate:number;
    @Column({type:"date"})
    loanDate:Date;
    @Column({type:"date"})
    returnDate:Date;
    @Column({type:"date"})
    replay:Date;
    @Column({nullable:true,default:0})
    emi:number;
    @ManyToOne((type) => Branch,branch=>branch.loans)
    branch:Branch
    @ManyToMany(type => Customer,customer=>customer.loans)
    @JoinTable()
    customers:Customer[];


}