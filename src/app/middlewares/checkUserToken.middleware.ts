import * as jwt from 'jsonwebtoken';
import conf from "../../config";
import { UserService } from "../components/user/user.service";
import { Request, Response, NextFunction } from "express";
import { IRequest } from '../interfaces/request.interface';
import { IUserModel } from '../components/user/user.model';


export default async (req: IRequest, res:Response, next: NextFunction) => {

    const token: string | any = req.headers['authorization'];
    var user: IUserModel | null = null;
    
    if (token) {
        try {
            var tokenObj: any = jwt.verify(token, conf.get('secrets:token'));
        } catch ({ message }) {
            return next ({
                status: 401,
                message
            });
        }
        
        if (tokenObj) {
            try {
                user = await UserService.getUserById(tokenObj._id);
            } catch (error) {
                return next(error);
            }
        }
        
        req.currentUser = user;
    }

    next();
}