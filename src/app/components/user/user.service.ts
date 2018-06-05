import { IUserModel } from "./user.model";
import { User } from "./user.schema";
import { IUser } from "./user.interface";
import { IRole } from "../role/role.interface";
import { Role } from "../role/role.schema";

export class UserService {

    //
    public static getAll = async (user: string): Promise<IUserModel[]> => {
        
        try {
            var users: IUserModel[] = await User.find({ _id : { $ne : [ user ] }}, { password: false }, { sort: { name: 1 } })
                .populate('_access')
                .populate('position');
        } catch (error) {
            throw error;
        }

        return users;
    }

    public static getAllClients = async (user: string): Promise<IUserModel[]> => {

        try {
            var client_role: IRole = await Role.findOne({ value: 'ROLE_CLIENT' });
        } catch (error) {
            throw error;
        }
        
        try {
            var users: IUserModel[] = await User.find({ _id : { $ne : [ user ] }, _access: client_role}, { password: false}, { sort: { name: 1 } })
                .populate('_access')
                .populate('position');
        } catch (error) {
            throw error;
        }

        return users;
    }

    //
    public static getUserById = async (id: String): Promise<IUserModel> => {
        try {
            var user: IUserModel = await User.findById( id, { password: 0 })
                .populate('_access')
                .populate('position');
        } catch (e) {
            throw e; 
        }

        return user;

    }

    //
    public static findByParams = async (params: IUser): Promise<IUserModel[]> => {
        try {
            var result: IUserModel[] = await User.find(params, { password: false }, { sort: { name: 1 } })
                .populate('_access')
                .populate('position');
        } catch (e) {
            throw e;
        }

        return result;
    }

    //
    public static create = async (credentials: IUser): Promise<IUserModel> => {
        try {
            var user: IUserModel = await User.create(credentials);
        } catch (error) {
            throw error;
        }

        return user;
    }

    public static delete = async (users: IUser[]): Promise<void> => {
        try {
            var res: void = await User.remove({_id: users});
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static edit = async (_id: String, data: IUser): Promise<void> => {
        try {
            var res: void = await User.update({ _id }, data);
        } catch (error) {
            throw error;
        }

        return res;
    }

}