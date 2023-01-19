import {connection} from "../../connection/database";
import {Bank} from "../entities/Bank";
import {BaseController} from "./BaseController";

export class BankController extends BaseController {
    //create new bank


    /**
     * todo: use relevant name
     * @param ctx
     */
    async createBank(ctx: any,) {
        try {
            const bankRepository = connection.getRepository(Bank);
            const data: any = ctx.request['body'];
            // todo: you can use type string[] //done
            const inputFields: string[] = ['name', 'address'];
             const error: any = {};
            console.log(inputFields);
            inputFields.forEach(field => {
                // todo: you may use "if(!data[field])" //
                if (!data[field]) {
                    error[field] = `${field} is required`;
                }
            });
            if (JSON.stringify(error) !== '{}') {
                return await super.response(ctx, 400, error);
            }

            await bankRepository.save(data);
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
            const bankRepository = connection.getRepository(Bank);
            const data: any = ctx.request['body'];
            // todo: use variable i.e bandId //Done
            const bankId = ctx.params.id;
            const inputFields: string[] = ['name', 'address'];
            const error: any = {};
            inputFields.forEach(field => {
                if (data.hasOwnProperty(field) && data[field]== "") {
                    error[field] = `${field} is required`;
                }
            });
            const checkIfBankExist = await bankRepository.find({where: {id: bankId}});

            // todo: you can do with array.length //done
            if (checkIfBankExist.length < 1) {
                error['notExist'] = "this bank does not exist";
            }
            // console.log(error);
            if (JSON.stringify(error) !== '{}') {
                return await super.response(ctx, 400, error);
            }
            await bankRepository.update(bankId, data);
            return await super.response(ctx, 201, "Bank Updated successfully");
        } catch (e: any) {
            console.log(e);
            return await super.response(ctx, 500, "internal Server Error!");

        }
    }

    //get all bank
    public async getAllBank(ctx: any) {
        try {
            return ctx.body = await connection.getRepository(Bank).find();
        } catch (e) {
            console.log(e);
            return await super.response(ctx, 500, "Internal Server Error");
        }
    }

    //get bank by bankId

    public async getBankById(ctx: any) {
        try {
            const bankRepository = connection.getRepository(Bank);
            const id = ctx.params.id;
            // todo: this can be return and checked both at same time //done
            const checkIfBankExist = await bankRepository.find({where: {id: id}});
            if (checkIfBankExist.length > 0) {
                return super.response(ctx, 202, "This Bank does not Exist");
            }
        } catch (e) {
            console.log(e);
            return await super.response(ctx, 500, "internal Server Error");
        }
    }

    //delete bak by BankId
    async deleteBankById(ctx: any) {
        const id = ctx.params.id;
        const response = await connection.getRepository(Bank).softDelete({id: id});

        if (response.affected !== 0) {
            return super.response(ctx, 200, "Deleted Successfully!")
        } else {
            return super.response(ctx, 200, "No Record Found!");
        }
    }
}