import { NextFunction, Request, Response } from "express";
import { IUserModel } from "./user.model";
import { UserService } from "./user.service";

import { IRequest } from "../../interfaces/request.interface";
import { currentId } from "async_hooks";

import logger from "../../../lib/log";

export class UserController {

    /**
     * Get all users
     * @param {Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public static async getAll (req: IRequest, res: Response, next: NextFunction) {

        let current_user = req.currentUser;

        if (current_user._access.value === 'ROLE_ASSOCIATE') {
            try {
                var users: IUserModel[] = await UserService.getAllClients(req.currentUser._id); 
             } catch ({ message }) {
                 return next({
                     status: 500,
                     message
                 });
             }
        } else {
            try {
               var users: IUserModel[] = await UserService.getAll(req.currentUser._id); 
            } catch ({ message }) {
                return next({
                    status: 500,
                    message
                });
            }
        }


        res.json(users);
    }

    public static async getCurrentUser (req: IRequest, res: Response, next: NextFunction) {
        const currentUser: IUserModel = req.currentUser;

        if (!currentUser) {
            return next({
                status: 402,
                message: 'User not found'
            });
        }

        res.json(currentUser);
    }

    public static async getOneById (req: Request, res: Response, next: NextFunction) {
        const { _id } = req.params;

        try {
           var user: IUserModel = await UserService.getUserById(_id); 
        } catch ({ message }) {
            return next({
                status: 402,
                message: 'User not found'
            });
        }

        res.json(user);
    }

    /**
     * Create User
     * @param {Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public static create = async (req: Request, res: Response, next: NextFunction) => {

        var user: IUserModel | false = false;

        try {
            user = await UserService.create(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }
        res.json(user);
    }

    public static async delete (req: Request, res: Response, next: NextFunction) {
        
        try {
           var result: void = await UserService.delete(req.body); 
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    public static async markForDelete (req: Request, res: Response, next: NextFunction) {

        const { user, action } = req.body;

        try {
           var result: void = await UserService.edit( user._id, { _delete: action }); 
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    public static async edit (req: Request, res: Response, next: NextFunction) {
        const { _id } = req.body;
        delete req.body._id;

        try {
           var result: void = await UserService.edit(_id, req.body); 
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }
}