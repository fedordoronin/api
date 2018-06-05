import { Router, Request, Response, NextFunction } from 'express';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessClient from "../middlewares/accessClient.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";
import { MessageController } from '../components/message/message.controller';

export class MessageRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {

    this.router.get('/', MessageController.get);
    this.router.post('/', accessAdmin, MessageController.set);

    return this.router;
  }
}