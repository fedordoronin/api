import { IRole } from "../role/role.interface";
import { IPosition } from "../position/position.interface";

export interface IUser {
    phone?: String,
    name?: String,
    email?: String,
    password?: String,
    position?: IPosition,
    _access?: IRole,
    _delete?: Boolean
}