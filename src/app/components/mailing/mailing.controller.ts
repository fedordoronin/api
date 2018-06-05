import { IRequest } from "../../interfaces/request.interface";
import { NextFunction, Response } from "express";
import { MailingModel } from "./mailing.model";
import { MailingService } from "./mailing.service";
import { IMailing } from "./mailing.interface";

export class MailingController {
    static async create (req: IRequest, res: Response, next: NextFunction) {

        let data: IMailing = req.body;
        const user = req.currentUser;

        data.create_who = user;

        try {
            var mailing: MailingModel = await MailingService.create(data);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(mailing);
    }

    static async remove (req: IRequest, res: Response, next: NextFunction) {
        const { _id } = req.params;

        try {
            var result = await MailingService.remove(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    static async update (req: IRequest, res: Response, next: NextFunction) {
        const { _id } = req.params;

        try {
            var result = await MailingService.update(_id, req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    static async getAll (req: IRequest, res: Response, next: NextFunction) {
        try {
            var mailing: MailingModel[] = await MailingService.getAll();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(mailing);
    }

    static async getById (req: IRequest, res: Response, next: NextFunction) {
        const { _id } = req.params;

        try {
            var mailing: MailingModel = await MailingService.getById(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(mailing);
    }

    static async sendMailing (req: IRequest, res: Response, next: NextFunction) {

        const { _id } = req.body;

        try {
            var result = await MailingService.sendMailing(_id, req.currentUser);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    static async removeAttachment (req: IRequest, res: Response, next: NextFunction) {

        const _id = req.params._id === '0' ? null : req.params._id;
        const { file } = req.body;

        try {
            var result = await MailingService.removeAttachment(file, _id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

}