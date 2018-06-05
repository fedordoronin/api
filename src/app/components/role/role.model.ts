import { Document } from "mongoose";
import { IRole } from "./role.interface";

export interface RoleModel extends Document, IRole{}