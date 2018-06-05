import { Role } from "./role.schema";
import { IRole } from "./role.interface";
import { RoleModel } from "./role.model";

export class RoleService {

    public static getAll = async () => {
        try {
            var roles: IRole[] = await Role.find();
        } catch (error) {
            throw error;
        }

        return roles;
    }

    public static add = async (data: IRole) => {
        try {
            var role: IRole = await Role.create(data);
        } catch (error) {
            throw error;
        }

        return role;
    }

    public static getRoleByValue = async (value: string) => {
        try {
            var role: RoleModel = await Role.findOne({ value });
        } catch (error) {
            throw error;
        }

        return role;
    }

    public static getRoleById = async (_id: string) => {
        try {
            var role: IRole = await Role.findById({ _id });
        } catch (error) {
            throw error;
        }

        return role;
    }
}