import {BaseController} from "./BaseController";
import {DataSource, Repository} from "typeorm";

import {Branch} from "../entities/Branch";
import {Bank} from "../entities/Bank";
import {BankController} from "./BankController";

export class BranchController extends BaseController {
    branchRepository: Repository<Branch>;
    bankRepository:Repository<Bank>
    inputFields: string[] = ['name', 'address'];

    constructor(dbConnection: DataSource) {
        super(dbConnection);
        this.branchRepository = dbConnection.getRepository(Branch);
        this.bankRepository=dbConnection.getRepository(Bank);

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

}