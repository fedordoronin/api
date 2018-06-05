import { CompanyModel } from "./company.model";
import { Company } from "./company.scheme";
import { ICompany } from "./company.interface";
import { Tax } from "../nalogi/tax.schema";
import { IUserModel } from "../user/user.model";

export class CompanyService {
    
    public static getAll = async (data = null): Promise<CompanyModel[]> => {
        
        try {
            var companys: CompanyModel[] = await Company.find(data, null, { sort: { name: 1 } })
                .populate('user');
        } catch (error) {
            throw error;
        }

        return companys;
    }

    public static getById = async (_id: CompanyModel): Promise<CompanyModel> => {
        try {
            var company: CompanyModel = await Company.findById(_id)
                .populate('user');
        } catch (error) {
            throw error;
        }

        return company;
    }

    public static search = async (search): Promise<CompanyModel[]> => {
        try {
            var companys: CompanyModel[] = await Company.find(search, null, { sort: { name: 1 } });
        } catch (error) {
            throw error;
        }

        return companys;
    }

    public static create = async (credentials: ICompany): Promise<CompanyModel> => {
        try {
            var company: CompanyModel = await Company.create(credentials);
        } catch (error) {
            throw error;
        }

        return company;
    }

    public static update = async (_id: string, data: ICompany): Promise<CompanyModel> => {
        try {
            var result = await Company.update({ _id }, data);
        } catch (error) {
            throw error;
        }

        return result;
    }

    public static delete = async (items: Array<any>): Promise<void> => {
        try {
            var res: void = await Company.remove({ _id: items });
            var res2: void = await Tax.remove({ company: items });
        } catch (error) {
            throw error;
        }

        return res;
    }    

}