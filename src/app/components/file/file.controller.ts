import { IRequest } from "../../interfaces/request.interface";
import { Response, NextFunction } from "express";
import { FileService } from "./file.service";

export class FileController {

    static async upload (req: IRequest, res: Response, next: NextFunction) {
        try {
            var result = await FileService.upload(req.files);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json(result);
    }

    static async remove (req: IRequest, res: Response, next: NextFunction) {
        try {
            await FileService.remove(req.body);
        } catch ({ message }) {
            return next({
                status: 500,
                message
            });
        }

        res.json('ok');
    }

}