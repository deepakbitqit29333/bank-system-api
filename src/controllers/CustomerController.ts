import {connection} from "../../connection/database";
import {Customer} from "../entities/Customer";

export class CustomerController {
    public static async create(ctx: any): Promise<any> {
        try {
            const customerRepo = connection.getRepository(Customer);
            const data: any = ctx.request['body'];
            const error: any = {};
            if (!data.hasOwnProperty('name')) {
                error['name'] = "name required";
            }
            if (!data.hasOwnProperty('mobileNo')) {
                error['mobileNo'] = "Mobile number required ";
            }
            if (!data.hasOwnProperty('gender')) {
                error['gender'] = "gender is required";
            }
            if (!data.hasOwnProperty('dob')) {
                error['dob'] = "date of birth is  required";
            }
            if (!data.hasOwnProperty('dob')) {
                error['aadhaarNo'] = "aadhaar number is required";
            } else if (data.aadhaarNo.length < 12 || data.aadhaarNo.length > 12) {
                error['aadhaarNo'] = "aadhaar number is should be 12 digit";
            } else {
                const found = await customerRepo.findOne({where: {aadhaarNo: data.aadhaarNo}});   //<<< throws exception if tables not already created
                if (found) {
                    error['alreadyExist'] = "aadhaar number is already exists";
                }
            }
            if (JSON.stringify(error) !== '{}') {
                ctx.status = 400;
                ctx.body = error;
                return;
            } else {
                const customer = new Customer();
                customer.name = data.name;
                customer.mobileNo = data.mobileNo;
                customer.address = data.address;
                customer.gender = data.gender;
                customer.alternateMobileNo = data.alternateMobileNo;
                customer.dob = data.dob;
                customer.aadhaarNo = data.aadhaarNo;
                ctx.body = await customerRepo.save(customer);
            }
        } catch (e: any) {
            throw  e;
        }

    }
}