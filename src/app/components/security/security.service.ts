import {IUserModel} from "../user/user.model";
import {User} from "../user/user.schema";
import * as jwt from "jsonwebtoken";
import conf from "../../../config";
import { IUser } from "../user/user.interface";
import { RoleModel } from "../role/role.model";
import { RoleService } from "../role/role.service";

export class SecurityService {

    public static signIn = async (email: String, password: String): Promise<String> => {

        var user: IUserModel | null = null;
        try {
            user = await User.findOne({ email })
            .populate('role')
            .populate('position');
        } catch (error) {
            throw { message: "Нет такого пользователя" };
        }
        
        try {
            await user.comparePassword(password);
        } catch (error) {
            throw { message: "Введенные данные не верны" };
        }
        
        const token: string = jwt.sign({ _id: user._id }, conf.get('secrets:token'));

        return token;
    }
}