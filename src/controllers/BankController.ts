import {Bank} from "../entities/Bank";
import {BaseController} from "./BaseController";
import {DataSource, Repository} from "typeorm";
export class BankController extends BaseController {
           private repo:Repository<any>;
           private inputFields:string[]=['name','address'];
        constructor(connection:DataSource) {
            super();
            this.repo=connection.getRepository(Bank);
        }
    /**
     * todo: use relevant name
     * @param ctx
     */
    async createBank(ctx: any) {
        try {
            const data: any = ctx.request['body'];
            const error:any={};
            // todo: you can use type string[] //done
            this.inputFields.forEach(field => {
                // todo: you may use "if(!data[field])" //
                if (!data[field]) {
                    error[field] = `${field} is required`;
                }
            });
            if (JSON.stringify(error) !== '{}') {
                return await super.response(ctx, 400, error);
            }

            await this.repo.save(data);
            // todo: try calling constructor and use "this"
            return await super.response(ctx, 201, "Bank created successfully");
        } catch (e: any) {
            console.log(e);
            return await super.response(ctx, 500, "internal server error");
        }
    }

    // update bank by bankId

    // todo: rename updateBankById //done
    public async updateById(ctx: any) {
        try {
            const data: any = ctx.request['body'];
            // todo: use variable i.e bandId //Done
            const error:any={};
            const bankId = ctx.params.id;
            this.inputFields.forEach(field => {
                if (data.hasOwnProperty(field) && data[field]== "") {
                    error[field] = `${field} is required`;
                }
            });
            const checkIfBankExist = await this.repo.find({where: {id: bankId}});

            // todo: you can do with array.length //done
            if (checkIfBankExist.length < 1) {
                error['notExist'] = "this bank does not exist";
            }
            // console.log(error);
            if (JSON.stringify(error) !== '{}') {
                return await super.response(ctx, 400, error);
            }
            await this.repo.update(bankId, data);
            return await super.response(ctx, 201, "Bank Updated successfully");
        } catch (e: any) {
            console.log(e);
            return await super.response(ctx, 500, "internal Server Error!");

        }
    }

    //get all bank
    public async getAllBank(ctx: any) {
        try {
            return ctx.body = await this.repo.find();
        } catch (e) {
            console.log(e);
            return await super.response(ctx, 500, "Internal Server error");
        }
    }

    //get bank by bankId

    public async getBankById(ctx: any) {
        try {
            const id = ctx.params.id;
            // todo: this can be return and checked both at same time //done
            const checkIfBankExist = await this.repo.find({where: {id: id}});
            if (checkIfBankExist.length < 1) {
                return super.response(ctx, 202, "This Bank does not Exist");
            }
            return ctx.body=checkIfBankExist;
        } catch (e) {
            console.log(e);
            return await super.response(ctx, 500, "internal Server error");
        }
    }

    //delete bak by BankId
    async deleteBankById(ctx: any) {
        const id = ctx.params.id;
        const response = await this.repo.softDelete({id: id});

        if (response.affected !== 0) {
            return super.response(ctx, 200, "Deleted Successfully!")
        } else {
            return super.response(ctx, 200, "No Record Found!");
        }
    }
}
