import { MessageModel } from "./message.model";
import { Message } from "./message.scheme";
import { IMessage } from "./message.interface";

export class MessageService {
    public static async get () {
        try {
            var message: MessageModel[] = await Message.find();
        } catch (error) {
            throw error;
        }

        return message;
    }

    public static async add (data: IMessage) {
        try {
            var message: MessageModel = await Message.create(data);
        } catch (error) {
            throw error;
        }

        return message;
    }

    public static async update (_id: string, data: IMessage) {
        try {
            var res = await Message.update({ _id }, data);
        } catch (error) {
            throw error;
        }

        return res;
    }
}