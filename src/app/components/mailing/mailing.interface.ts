import { IUserModel } from "../user/user.model";
import { CompanyModel } from "../company/company.model";

export interface IMailing {
    title?: string,
    description?: string,
    date_create?: Date,
    create_who?: IUserModel,
    date_sent?: Date,
    sent?: boolean,
    sent_who?: IUserModel,
    sent_to?: CompanyModel[],
    sent_response?: Object,
    options?: {
        from?: string,
        to?: string,
        subject?: string,
        html?: string,
        attachments?: string[]
    },
    delete?: boolean
}