import {Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from "typeorm";
export class BaseEntity{
    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
}