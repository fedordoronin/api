import { Schema, Model, model, SchemaTypes} from "mongoose";
import {CompanyModel} from "./company.model";

const CompanySchema: Schema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true
    },
    inn: {
        type: Number,
        unique: true,
        required: true
    },
    kpp: {
        type: Number
    },
    _delete: {
        type: Boolean,
        default: false
    }
});

export const Company: Model<CompanyModel> = model<CompanyModel>("Company", CompanySchema);
