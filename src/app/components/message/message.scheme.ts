import { Schema, model, Model } from "mongoose";
import { MessageModel } from "./message.model";

const MessageSchema = new Schema({
    text: {
        type: String
    }
});

export const Message: Model<MessageModel> = model<MessageModel>('Message', MessageSchema);