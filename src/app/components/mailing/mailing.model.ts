import { IMailing } from "./mailing.interface";
import { Document } from "mongoose";

export interface MailingModel extends IMailing, Document {}