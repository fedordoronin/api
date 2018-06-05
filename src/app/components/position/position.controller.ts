import { Request, Response, NextFunction } from "express";
import { PositionModel } from "./position.model";
import { PositionService } from "./position.service";

export class PositionController {
    public static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var positions: PositionModel[] = await PositionService.getAll();
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(positions);
    }

    public static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var position: PositionModel = await PositionService.create(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(position);
    }

    public static delete = async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.body;
        
        try {
            var result: void = await PositionService.delete(_id);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }
}