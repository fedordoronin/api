import { IRequest } from "../../interfaces/request.interface";
import { Response, NextFunction } from "express";
import { INews } from "./news.interface";
import { NewsService } from "./news.service";

export class NewsController {

    public static async getAll (req: IRequest, res: Response, next: NextFunction) {
        try {
            var news: INews[] = await NewsService.getAll();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(news);
    }

    public static async getById (req: IRequest, res: Response, next: NextFunction) {

        const { _id } = req.params;

        try {
            var news: INews = await NewsService.getById(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(news);
    }

    public static async create (req: IRequest, res: Response, next: NextFunction) {
        try {
            var news: INews = await NewsService.create(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(news);
    }

    public static async remove (req: IRequest, res: Response, next: NextFunction) {

        const { _id } = req.params;

        try {
            var result = await NewsService.remove(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    public static async update (req: IRequest, res: Response, next: NextFunction) {

        const { _id } = req.params;

        try {
            var result = await NewsService.update(_id, req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

}