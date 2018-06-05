import { Request, Response, NextFunction } from "express";
import { TaxModel } from "./tax.model";
import { TaxService } from "./tax.service";
import { ITax } from "./tax.interface";
import { IRequest } from "../../interfaces/request.interface";
import { IUser } from "../user/user.interface";
import { IUserModel } from "../user/user.model";
import logger from "../../../lib/log";

export class TaxController {

    /**
     * Get all taxes
     */
    public static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var taxes: TaxModel[] = await TaxService.getAll();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(taxes);
    }

    /**
     * Get all taxes by company
     */
    public static getAllByCompany = async (req: Request, res: Response, next: NextFunction) => {

        const { _id } = req.params;

        try {
            var taxes: TaxModel[] = await TaxService.getAllByCompany(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(taxes);
    }

    /**
     * Filter taxes
     */
    public static filter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var taxes: TaxModel[] = await TaxService.filter(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(taxes);
    }

    /**
     * Get tax by id
     */
    public static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;
        
        try {
            var tax: TaxModel = await TaxService.getById(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(tax);
    }

    /**
     * Create tax
     */
    public static create = async (req: IRequest, res: Response, next: NextFunction) => {
        logger.debug('Create tax', null, req);

        var data: ITax = req.body;

        data.leader = data.leader || {};
        data.accountant = data.accountant || {};
        data.accountant_z = data.accountant_z || {};

        var user: IUserModel = req.currentUser;

        if (user._access.value === 'ROLE_ASSOCIATE' || user._access.value === 'ROLE_ADMIN') {
            if (user.position) {
                if (user.position.value === 'leader') {
                    data.leader.user = user;
                    data.leader.date_change = new Date();
                 }
    
                if (user.position.value === 'accountant') {
                   data.accountant.user = user;
                   data.accountant.date_change = new Date();
                }
    
                if (user.position.value === 'accountant_salary') {
                    data.accountant_z.user = user;
                    data.accountant_z.date_change = new Date();
                 }
            } else {
                data.leader.user = user;
                data.leader.date_change = new Date();
            }
        }

        try {
            var tax: TaxModel = await TaxService.create(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(tax);
    }

    /**
     * Update tax
     */
    public static update = async (req: IRequest, res: Response, next: NextFunction) => {
        logger.debug('Update tax', null, req);

        const { _id } = req.body;
        delete req.body._id;
        var data: ITax = req.body;

        data.leader = data.leader || {};
        data.accountant = data.accountant || {};
        data.accountant_z = data.accountant_z || {};

        var user: IUserModel = req.currentUser;

        if (user._access.value === 'ROLE_ASSOCIATE' || user._access.value === 'ROLE_ADMIN') {
            if (user.position) {
                if (user.position.value === 'leader') {
                    data.leader.user = user;
                    data.leader.date_change = new Date();
                 }
    
                if (user.position.value === 'accountant') {
                   data.accountant.user = user;
                   data.accountant.date_change = new Date();
                }
    
                if (user.position.value === 'accountant_salary') {
                    data.accountant_z.user = user;
                    data.accountant_z.date_change = new Date();
                 }
            } else {
                data.leader.user = user;
                data.leader.date_change = new Date();
            }
        }

        try {
            var result: any = await TaxService.update(_id, data);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(true);
    }

    /**
     * Remove tax
     */
    public static delete = async (req: Request, res: Response, next: NextFunction) => {
        
        const items = req.body.map(item => {
            return item._id
        });

        try {
            var result: any = await TaxService.delete(items);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    /**
     * Mark tax for remove
     */
    public static markDelete = async (req: Request, res: Response, next: NextFunction) => {
        const { _id, _delete } = req.body;

        try {
            var result: any = await TaxService.markDelete(_id, _delete);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }
}