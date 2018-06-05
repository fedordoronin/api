import { Request, Response, NextFunction } from "express";
import { MessageModel } from "./message.model";
import { MessageService } from "./message.service";

export class MessageController {
    public static async get (req: Request, res: Response, next: NextFunction) {
        try {
            var message: MessageModel[] = await MessageService.get();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(message[0]);
    }

    public static async set (req: Request, res: Response, next: NextFunction) {

        try {
            var messages: MessageModel[] = await MessageService.get();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        if (!messages || messages.length === 0) {
            try {
                var message: MessageModel = await MessageService.add(req.body);
            } catch ({ message }) {
                return next({
                    status: 500,
                    message
                });
            }
        } else {
            try {
                var result = await MessageService.update(messages[0]._id, req.body);
            } catch ({ message }) {
                return next({
                    status: 500,
                    message
                });
            }
        }

        
        res.json('ok');
    }


}