import { Document } from "mongoose";
import { IPosition } from "./position.interface";

export interface PositionModel extends Document, IPosition {}