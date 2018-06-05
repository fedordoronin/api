import { Request, Response, NextFunction } from "express";
import { IRole } from "./role.interface";
import { Role } from "./role.schema";
import { RoleService } from "./role.service";

export class RoleController {
    public static getAll = async (req: Request, res: Response, next: NextFunction) => {

        try {
            var roles: IRole[] = await RoleService.getAll();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(roles);
    }

    public static add = async (req: Request, res: Response, next: NextFunction) => {

        try {
            var role: IRole = await RoleService.add(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(role);
    }
}