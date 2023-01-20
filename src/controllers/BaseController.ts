
export class BaseController {

    response(ctx: any, status: number, message: any) {
        ctx.status = status;
        ctx.body = message;
        return ctx;
    }
}