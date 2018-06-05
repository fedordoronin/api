import { Router, Request, Response, NextFunction } from 'express';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";
import { MailingController } from '../components/mailing/mailing.controller';

export class MailingRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {
      
    this.router.get('/', accessAssociate, MailingController.getAll);
    this.router.get('/:_id', accessAssociate, MailingController.getById);
    this.router.put('/', accessAssociate, MailingController.create);
    this.router.delete('/:_id', accessAdmin, MailingController.remove);
    this.router.post('/send', accessAssociate, MailingController.sendMailing);
    this.router.post('/:_id', accessAssociate, MailingController.update);
    this.router.post('/removeAttachment/:_id', accessAssociate, MailingController.removeAttachment);

    return this.router;
  }
}