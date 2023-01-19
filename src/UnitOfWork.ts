import {DataSource} from "typeorm";
import {raw} from "body-parser";
import {Bank} from "./entities/Bank";

export class UnitOfWork {
    constructor(private con: DataSource) {
    }

    get getBankRepository() {
        return this.con.getRepository(Bank);
    }
}