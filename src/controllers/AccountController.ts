import {connection} from "../../connection/database";
import {Customer} from "../entities/Customer";
import {Branch} from "../entities/Branch";
import {Account} from "../entities/Account";

export class AccountController {
    public static async create(ctx: any): Promise<any> {
        try {
            const accountRepository = connection.getRepository(Account);
            const branchRepository = connection.getRepository(Branch);
            const customerRepository = connection.getRepository(Customer);
            const account = new Account();
            const data: any = ctx.request['body'];
            const error: any = {};
            if (!data.hasOwnProperty('accountNo')) {
                error['accountNo'] = "account number is required";
            } else {
                const accountFound = await accountRepository.findOne({where: {accountNo: data.accountNo}});
                if (accountFound) error['accountNo'] = "account number already Exist";
            }
            if (!data.hasOwnProperty('accountType')) {
                error['accountType'] = "accountType is required ";
            }
            if (!data.hasOwnProperty('customerId')) {
                error['customerId'] = "customerId is required ";
            } else {
                //customer exist
                const customer1 = await customerRepository.findOne({where: {id: data.customerId}})
                if (customer1) {
                    account.customers = [customer1];
                } else {
                    error['customer'] = "customer not found";
                }

            }
            if (JSON.stringify(error) !== '{}') {
                ctx.status = 400;
                ctx.body = error;
                return;
            } else {
                account.accountNo = data.accountNo;

                account.accountType = data.accountType;
                if (data.hasOwnProperty('balance') && data.hasOwnProperty('balance').type('number')) {
                    account.balance = data.balance;
                }
                if (data.hasOwnProperty('nominee') && data.nominee !== "") {
                    account.nominee = data.nominee;
                }
                const branch1 = await branchRepository.findOne({where: {id: 6}})
                if (branch1) {
                    account.branch = branch1;
                } else {
                    ctx.status = 400;
                    ctx.body = error;
                    return;
                }
                ctx.body = await accountRepository.save(account);
            }
        } catch (e: any) {
            throw  e;
        }

    }
}