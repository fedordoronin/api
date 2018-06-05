import { Request, Response, NextFunction } from "express";
import { CompanyModel } from "./company.model";
import { CompanyService } from "./company.service";
import { IRequest } from "../../interfaces/request.interface";
import { IUserModel } from "../user/user.model";

import logger from "../../../lib/log";

export class CompanyController {

    /**
     * Get all companies
     */
    public static getAll = async (req: IRequest, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - getAll : ', null, req);

        let user: IUserModel = req.currentUser;
        
        if (req.currentUser._access.value === 'ROLE_ADMIN' || req.currentUser._access.value === 'ROLE_ASSOCIATE') {
            user = null;
        }
        
        try {

            if (user) {
                var companys: CompanyModel[] = await CompanyService.getAll({ user });
            } else {
                var companys: CompanyModel[] = await CompanyService.getAll();
            }

        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }        

        res.json(companys);
    }

    /**
     * Get all companies by user
     */
    public static getAllByUser = async (req: IRequest, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - getAllByUser : ', null, req);

        const { user } = req.params;
        
        try {
            var companys: CompanyModel[] = await CompanyService.getAll({ user });
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }        

        res.json(companys);
    }

    /**
     * Get company by id
     */
    public static getById = async (req: Request, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - getById : ', null, req);

        const { _id } = req.params;

        try {
            var company: CompanyModel = await CompanyService.getById(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }        

        res.json(company);
    }

    /**
     * Create company
     */
    public static create = async (req: Request, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - create : ', null, req);

        try {
            var company: CompanyModel = await CompanyService.create(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(company);
    }

    /**
     * Update company
     */
    public static update = async (req: Request, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - update : ', null, req);

        const { _id } = req.params;

        try {
            var result = await CompanyService.update(_id, req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    /**
     * Remove company
     */
    public static delete = async (req: Request, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - delete : ', null, req);
        
        const items = req.body.map(item => {
            return item._id
        });

        try {
            var result: any = await CompanyService.delete(items);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    /**
     * Mark for delete
     */
    public static mfd = async (req: Request, res: Response, next: NextFunction) => {
        logger.debug('Company controller. function - mfd : ', null, req);

        const { _id } = req.params;
        
        try {
            var result: any = await CompanyService.update(_id, req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

}