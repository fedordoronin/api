import { IRequest } from "../interfaces/request.interface";
import { NextFunction, Response } from "express";
import { IUserModel } from "../components/user/user.model";
import { IRole } from "../components/role/role.interface";
import { Role } from "../components/role/role.schema";
import conf from "../../config";

export default async (req: IRequest, res:Response, next: NextFunction) => {

    try {
        var roles = await Role.find();
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    if (!roles) {
        roles = conf.get('roles');
    }

    next();
}