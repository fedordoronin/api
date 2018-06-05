import { Schema, model, Model } from "mongoose";
import { NewsModel } from "./news.model";

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const News: Model<NewsModel> = model<NewsModel>('News', NewsSchema);