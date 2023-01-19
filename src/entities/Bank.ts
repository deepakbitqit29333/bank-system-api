import {Column, PrimaryGeneratedColumn, Entity, Index, OneToMany} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Branch} from "./Branch";

@Entity()
export class Bank extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany(type => Branch, branch => branch.bank)
    branches: Branch[];
}