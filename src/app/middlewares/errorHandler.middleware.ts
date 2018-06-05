import logger from "../../lib/log";
import { Request, Response, NextFunction } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    
    logger._error('', err, req);

    return res
        .status(err.status)
        .json({ message: err.message });
}