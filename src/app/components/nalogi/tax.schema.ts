import { Schema, Model, model, SchemaType, SchemaTypes} from "mongoose";
import { TaxModel } from "./tax.model";

const TaxSchema: Schema = new Schema({
    company: {
        type: SchemaTypes.ObjectId,
        ref: 'Company'
    },
    _month: {
        type: Number,
        required: true
    },
    _year: {
        type: Number,
        required: true
    },
    _fss: {
        type: Number,
        default: 0
    },
    _fss_ns: {
        type: Number,
        default: 0
    },
    _foms: {
        type: Number,
        default: 0
    },
    _pfr: {
        type: Number,
        default: 0
    },
    _ndfl: {
        type: Number,
        default: 0
    },
    _envd: {
        type: Number,
        default: 0
    },
    _usn: {
        type: Number,
        default: 0
    },
    _nds: {
        type: Number,
        default: 0
    },
    _profit_fb: {
        type: Number,
        default: 0
    },
    _profit_rf: {
        type: Number,
        default: 0
    },
    comment: {
        type: String
    },
    date_create: {
        type: Date,
        default: Date.now
    },
    _delete: {
        type: Boolean,
        default: false
    },
    leader: {
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'User'
        },
        date_change: Date
    },
    accountant: {
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'User'
        },
        date_change: Date
    },
    accountant_z: {
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'User'
        },
        date_change: Date
    }
});

export const Tax: Model<TaxModel> = model<TaxModel>("Tax", TaxSchema);