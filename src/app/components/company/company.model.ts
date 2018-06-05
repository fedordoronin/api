import {Document} from "mongoose";
import {ICompany} from "./company.interface";

export interface CompanyModel extends Document, ICompany {

}