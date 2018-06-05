import { Schema, Model, model} from "mongoose";
import { RoleModel } from "./role.model";

const RoleSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true,
        unique: true
    }
});

export const Role: Model<RoleModel> = model<RoleModel>("Role", RoleSchema);