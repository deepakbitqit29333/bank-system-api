import {Bank} from "../entities/Bank";
import {BaseController} from "./BaseController";
import {DataSource, Repository} from "typeorm";

export class BankController extends BaseController {
    private bankRepository: Repository<any>;
    private inputFields: string[] = ['name', 'address'];

    constructor(dbConnection: DataSource) {
        super(dbConnection);
        this.bankRepository = dbConnection.getRepository(Bank);
    }

    /**
     * todo: use relevant name
     * @param ctx
     */
    async createBank(ctx: any) {
        try {
            const data: any = ctx.request['body'];
            const error: any = {};
            // todo: you can use type string[] //done
            this.inputFields.forEach(field => {
                // todo: you may use "if(!data[field])" //
                if (!data[field]) {
                    error[field] = `${field} is required`;
                }
            });
            if (JSON.stringify(error) !== '{}') {
                return  this.response(ctx, 400, error);
            }

            await this.bankRepository.save(data);
            // todo: try calling constructor and use "this"
            return  this.response(ctx, 201, "Bank created successfully");
        } catch (e: any) {
            console.log(e);
            return  this.response(ctx, 500, "internal server error");
        }
    }

    // update bank by bankId

    // todo: rename updateBankById //done
    public async updateById(ctx: any) {
        try {
            const data: any = ctx.request['body'];
            // todo: use variable i.e bandId //Done
            const error: any = {};
            const bankId = ctx.params.id;
            this.inputFields.forEach(field => {
                if (data.hasOwnProperty(field) && data[field] == "") {
                    error[field] = `${field} is required`;
                }
            });
            const checkIfBankExist = await this.bankRepository.find({where: {id: bankId}});

            // todo: you can do with array.length //done
            if (checkIfBankExist.length < 1) {
                error['notExist'] = "this bank does not exist";
            }
            // console.log(error);
            if (JSON.stringify(error) !== '{}') {
                return  this.response(ctx, 400, error);
            }
            await this.bankRepository.update(bankId, data);
            return this.response(ctx, 201, "Bank Updated successfully");
        } catch (e: any) {
            console.log(e);
            return  this.response(ctx, 500, "internal Server Error!");

        }
    }

    //get all bank
    public async getAllBank(ctx: any) {
        try {
            return ctx.body = await this.bankRepository.find();
        } catch (e) {
            console.log(e);
            return this.response(ctx, 500, "Internal Server error");
        }
    }

    //get bank by bankId

    public async getBankById(ctx: any) {
        try {
            const id = ctx.params.id;
            // todo: this can be return and checked both at same time //done
            const checkIfBankExist = await this.bankRepository.findOne({where: {id: id}});
            if (checkIfBankExist.length < 1) {
                return this.response(ctx, 202, "This Bank does not Exist");
            }
            return ctx.body = checkIfBankExist;
        } catch (e) {
            console.log(e);
            return this.response(ctx, 500, "internal Server error");
        }
    }

    //delete bak by BankId
    async deleteBankById(ctx: any) {
        const id = ctx.params.id;
        const response = await this.bankRepository.softDelete({id: id});

        if (response.affected !== 0) {
            return super.response(ctx, 200, "Deleted Successfully!")
        } else {
            return this.response(ctx, 200, "No Record Found!");
        }
    }
}
