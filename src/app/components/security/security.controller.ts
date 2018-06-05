import { NextFunction, Request, Response } from "express";
import { SecurityService } from "./security.service";
import { IUserModel } from "../user/user.model";
import conf from "../../../config/index";

export class SecurityController {

    public static signIn = async (req: Request, res: Response, next: NextFunction) => {

        const { email, password } = req.body;
        try {
            var token = await SecurityService.signIn(email, password);
        } catch ({ message }) {
            return next({
                status: 401,
                message
            });
        }

        res.json(token);
    }

    public static getRoles = async (req: Request, res: Response, next: NextFunction) => {
        res.json(conf.get('security:roles'));
    }
}