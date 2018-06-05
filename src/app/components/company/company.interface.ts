import { IUserModel } from "../user/user.model";
import { ITax } from "../nalogi/tax.interface";

export interface ICompany {
    user?: IUserModel,
    name?: string,
    email?: string,
    inn?: number,
    kpp?: number,
    _delete?: boolean
}