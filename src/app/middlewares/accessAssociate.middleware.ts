import { IRequest } from "../interfaces/request.interface";
import { NextFunction, Response } from "express";
import { IUserModel } from "../components/user/user.model";

export default async (req: IRequest, res:Response, next: NextFunction) => {

    if (!req.currentUser) return next({ status: 500, message: "No auth"});

    const access = req.currentUser._access.value;

    if (access != 'ROLE_ADMIN' && access != 'ROLE_ASSOCIATE') {
        return next({
            status: 500,
            message: "У вас не достаточно прав!"
        });
    }

    next();
}