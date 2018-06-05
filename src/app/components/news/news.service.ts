import { INews } from "./news.interface";
import { News } from "./news.schema";

export class NewsService {

    public static async getAll () {
        try {
            var news: INews[] = await News.find().sort('-date');
        } catch (error) {
            throw error;
        }

        return news;
    }

    public static async getById (_id: string) {
        try {
            var news: INews = await News.findById({ _id });
        } catch (error) {
            throw error;
        }

        return news;
    }

    public static async create (data: INews) {
        try {
            var news: INews = await News.create(data);
        } catch (error) {
            throw error;
        }

        return news;
    }

    public static async remove (_id: string) {
        try {
            var res = await News.remove({ _id });
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static async update (_id: string, data: INews) {
        try {
            var res = await News.update({ _id }, data);
        } catch (error) {
            throw error;
        }

        return res;
    }

}