import { Router, Request, Response, NextFunction } from 'express';

import { UserController } from '../components/user/user.controller';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessClient from "../middlewares/accessClient.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";

export class UserRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {
      
    this.router.get('/', accessAssociate, UserController.getAll);
    this.router.get('/current', UserController.getCurrentUser);
    this.router.get('/:_id', accessAssociate, UserController.getOneById);
    this.router.post('/create', accessAdmin, UserController.create);
    this.router.post('/edit', accessAdmin, UserController.edit);
    this.router.post('/delete', accessAdmin, UserController.delete);
    this.router.post('/markfordelete', accessAssociate, UserController.markForDelete);

    return this.router;
  }
}