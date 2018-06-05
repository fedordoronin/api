import { Schema, Model, model, SchemaTypes } from "mongoose";
import { MailingModel } from "./mailing.model";

const MailingScheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date_create: {
        type: Date,
        default: Date.now
    },
    create_who: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    date_sent: Date,
    sent: {
        type: Boolean,
        default: false
    },
    sent_who: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    sent_to: [{
        type: SchemaTypes.ObjectId,
        ref: 'Company'
    }],
    sent_response: Object,
    options: {
        from: String,
        to: String,
        subject: String,
        html: String,
        attachments: [{ type: String}]
    },
    delete: {
        type: Boolean,
        default: false
    }
});

export const Mailing: Model<MailingModel> = model<MailingModel>('Mailing', MailingScheme);