import { IRequest } from "../interfaces/request.interface";
import { NextFunction, Response } from "express";
import { IUserModel } from "../components/user/user.model";
import conf from "../../config";

export default async (req: IRequest, res:Response, next: NextFunction) => {

    if (!req.currentUser) return next({ status: 500, message: "No auth"});
    const userRole = req.currentUser._access.value;

    if (userRole != conf.get('roles:admin:value')) {
        return next({
            status: 500,
            message: "У вас не достаточно прав!"
        });
    }

    next();
}