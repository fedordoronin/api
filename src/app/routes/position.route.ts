import { Router, Request, Response, NextFunction } from 'express';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";
import { PositionController } from '../components/position/position.controller';

export class PositionRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {
      
    this.router.get('/', accessAssociate, PositionController.getAll);
    this.router.post('/create', accessAdmin, PositionController.create);
    this.router.delete('/', accessAdmin, PositionController.delete);

    return this.router;
  }
}