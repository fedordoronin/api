import { Schema, Model, model, SchemaTypes, SchemaType} from "mongoose";
import * as bcrypt from 'bcrypt-as-promised';
import { IUserModel } from "./user.model";
import { Position } from "../position/position.schema";

const UserSchema: Schema = new Schema({
    phone: { 
        type: String, 
        required: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    position: { 
        type: SchemaTypes.ObjectId,
        ref: 'Position'
    },
    _access: { 
        type: SchemaTypes.ObjectId, 
        ref: 'Role'
    },
    _delete: { 
        type: Boolean, 
        default: false 
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
});

UserSchema.pre('update', async function (next) {
    let password = this.getUpdate().$set.password;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        this.update({}, { password });
    } else this.update();
    
    next();
});

UserSchema.methods.comparePassword = function (password: any): Boolean {
    return bcrypt.compare(password, this.password);
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
