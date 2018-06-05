import { ITax } from "./tax.interface";
import { TaxModel } from "./tax.model";
import { Tax } from "./tax.schema";
import { CompanyModel } from "../company/company.model";

export class TaxService {
    public static getAll = async (): Promise<TaxModel[]> => {
        try {
            var taxes: TaxModel[] = await Tax.find({}, null, { sort: { _year: -1, _month: -1 } })
                .populate({
                    path: 'company',
                    populate: { path: 'user' }
                })
                .populate('leader.user')
                .populate('accountant_z.user')
                .populate('accountant.user');
        } catch (error) {
            throw error;
        }

        return taxes;
    }

    public static getAllByCompany = async (company: CompanyModel): Promise<TaxModel[]> => {
        try {
            var taxes: TaxModel[] = await Tax.find({ company }, null, { sort: { _year: -1, _month: -1 } })
                .populate({
                    path: 'company',
                    populate: { path: 'user' }
                })
                .populate({ 
                    path:'leader.user',
                    populate: [{ path: 'position'}, { path: '_access' }],
                })
                .populate({ 
                    path:'accountant_z.user',
                    populate: [{ path: 'position'}, { path: '_access' }],
                })
                .populate({ 
                    path:'accountant.user',
                    populate: [{ path: 'position'}, { path: '_access' }],
                });
        } catch (error) {
            throw error;
        }

        return taxes;
    }

    public static filter = async (data: TaxModel): Promise<TaxModel[]> => {

        try {
            var taxes: TaxModel[] = await Tax.find(data, null, { sort: { _year: -1, _month: -1 } })
                .populate('company')
                .populate('leader.user')
                .populate('accountant_z.user')
                .populate('accountant.user');
        } catch (error) {
            throw error;
        }

        return taxes;
    }

    public static getByParams = async (params: ITax): Promise<TaxModel[]> => {
        try {
            var res: TaxModel[] = await Tax.find(params);
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static getById = async (_id: String): Promise<TaxModel> => {
        try {
            var res: TaxModel = await Tax.findById(_id);
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static create = async (credentials: ITax): Promise<TaxModel> => {
        try {
            var tax: TaxModel = await Tax.create(credentials);
        } catch (error) {
            throw error;
        }

        return tax;
    }

    public static update = async (_id: String, data: ITax): Promise<void> => {
        try {
            var res: void = await Tax.update({ _id }, data);
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static delete = async (items: Array<any>): Promise<void> => {
        try {
            var res: void = await Tax.remove({ _id: items });
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static markDelete = async (_id: String, _delete: boolean): Promise<void> => {
        try {
            var res: void = await Tax.update({ _id }, { _delete });
        } catch (error) {
            throw error;
        }

        return res;
    }
}