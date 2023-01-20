import {DataSource} from "typeorm";
import {Bank} from "../entities/Bank";
import {ObjectLiteral} from "typeorm/common/ObjectLiteral";
import {EntityTarget} from "typeorm/common/EntityTarget";
import {Repository} from "typeorm/repository/Repository";

export class BaseController {
    dbConnection:DataSource;
    constructor(connection:DataSource) {
        this.dbConnection=connection;
    }


    okResults() {}

    error() {}

    response(ctx: any, status: number, message: any) {
        ctx.status = status;
        ctx.body = message;
        return ctx;
    }

}