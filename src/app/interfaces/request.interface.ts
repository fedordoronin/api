import { Request } from "express";
import { IUserModel } from "../components/user/user.model";
import { IRole } from "../components/role/role.interface";

export interface IRequest extends Request {
    roles?: any,
    currentUser?: IUserModel;
}