import * as constants from "constants";
import {connection} from "../../connection/database";
import {UnitOfWork} from "../UnitOfWork";

export class BaseController {

    response(ctx: any, status: number, message: any) {
        ctx.status = status;
        ctx.body = message;
        return ctx;
    }
}