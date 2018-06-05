import { Schema, Model, model} from "mongoose";
import { PositionModel } from "./position.model";

const PositionSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
});

export const Position: Model<PositionModel> = model<PositionModel>("Position", PositionSchema);