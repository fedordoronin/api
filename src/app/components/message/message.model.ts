import { IMessage } from "./message.interface";
import { Document } from "mongoose";

export interface MessageModel extends IMessage, Document {}