import {BaseController} from "./BaseController";
import {DataSource, Repository} from "typeorm";

import {Branch} from "../entities/Branch";
import {Bank} from "../entities/Bank";
import {BankController} from "./BankController";

export class BranchController extends BaseController {
    branchRepository: Repository<Branch>;
    bankRepository: Repository<Bank>
    inputFields: string[] = ['name', 'address'];

    constructor(dbConnection: DataSource) {
        super(dbConnection);
        this.branchRepository = dbConnection.getRepository(Branch);
        this.bankRepository = dbConnection.getRepository(Bank);

    }

    public async createBranch(ctx: any) {
        try {
            const data: any = ctx.request['body'];
            const bankId = ctx.params.bankId;
            const error: any = {};
            //input validations
            this.inputFields.forEach(field => {
                if (!data[field]) {
                    error[field] = `${field} is required`;
                }
            });
            if (JSON.stringify(error) !== '{}') {
                return this.response(ctx, 400, error);
            }
            //Bank instance
            const bankEntity = await this.bankRepository.findOne({
                where: {id: bankId}
            });

            if (!bankEntity) {
                return this.response(ctx, 400, "this bank does not exist! ");
            }
            data.bank = bankEntity;
            await this.branchRepository.save(data);
            return this.response(ctx, 201, "Branch created successfully");
        } catch (e: any) {
            return this.response(ctx, 500, e.stack);
        }
    }

    public async updateBranchById(ctx: any) {
        try {
            const bankId: number = parseInt(ctx.params.bankId);
            const branchId: number = parseInt(ctx.params.branchId);
            const error: any = {};
            const data: any = ctx.request.body;
            this.inputFields.forEach(field => {
                if (data.hasOwnProperty(field) && data[field] == "") {
                    error[field] = `${field} is required`;
                }
            });
            const checkIfRecordExist = await this.branchRepository.findOne(
                {
                    relations:
                        {
                            bank: true
                        },
                    where:
                        {
                            bank:
                                {id: bankId},
                            id: branchId
                        }
                });
            console.log(checkIfRecordExist);
            if (!checkIfRecordExist) {
                error['notExist'] = "Bank or Branch does not exist!";
            }
            if (JSON.stringify(error) !== '{}') {
                return this.response(ctx, 400, error);
            }
            await this.branchRepository.update(branchId, data)
            return this.response(ctx, 200, "Branch updated Successfully");
        } catch (e: any) {
            return this.response(ctx, 500, e.stack);
        }
    }

}