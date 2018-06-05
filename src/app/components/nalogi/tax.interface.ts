import { CompanyModel } from "../company/company.model";
import { IUser } from "../user/user.interface";

export interface ITax {
    company?: CompanyModel,
    _month?: Number,
    _year?: Number,
    _fss?: Number,
    _fss_ns?: Number,
    _foms?: Number,
    _pfr?: Number,
    _ndfl?: Number,
    _envd?: Number,
    _usn?: Number,
    _nds?: Number,
    _profit_fb?: Number,
    _profit_rf?: Number,
    comment?: String
    date_create?: Date,
    _delete?: Boolean,
    leader?: {
        user?: IUser,
        date_change?: Date
    }
    accountant?: {
        user?: IUser,
        date_change?: Date
    },
    accountant_z?: {
        user?: IUser,
        date_change?: Date
    }
}