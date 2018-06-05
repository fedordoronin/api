import { INews } from "./news.interface";
import { Document } from "mongoose";

export interface NewsModel extends INews, Document {}