import { Document } from "mongoose";
import { ITax } from "./tax.interface";

export interface TaxModel extends Document, ITax {}