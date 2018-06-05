import { Router, Request, Response, NextFunction } from 'express';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessClient from "../middlewares/accessClient.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";
import { NewsController } from '../components/news/news.controller';

export class NewsRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {

    this.router.get('/', NewsController.getAll);
    this.router.get('/:_id', NewsController.getById);
    this.router.post('/', accessAdmin, NewsController.create);
    this.router.delete('/:_id', accessAdmin, NewsController.remove);
    this.router.post('/:_id', accessAdmin, NewsController.update);

    return this.router;
  }
}