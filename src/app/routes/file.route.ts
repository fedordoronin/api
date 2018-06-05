import { Router, Request, Response, NextFunction } from 'express';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessClient from "../middlewares/accessClient.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";

import { CompanyController } from '../components/company/company.controller';
import { FileController } from '../components/file/file.controller';
import * as multer from "multer";
import config from '../../config';

export class FileRoute {

    multerupload;

    constructor (
        private router: Router = Router()
    ) {
        this.multerupload = multer({ dest: config.get('files:temp') });
    }

    get routes () {

        this.router.post('/upload', accessAssociate, this.multerupload.any(), FileController.upload);
        this.router.post('/remove', accessAssociate, FileController.remove);

        return this.router;
    }
}