import { Router, Request, Response, NextFunction } from 'express';
import { TaxController } from '../components/nalogi/tax.controller';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessClient from "../middlewares/accessClient.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";

export class TaxRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {
    
    this.router.get('/', accessAssociate, TaxController.getAll);
    this.router.get('/:_id', accessClient, TaxController.getOneById);
    this.router.get('/company/:_id', accessClient, TaxController.getAllByCompany);
    this.router.post('/create', accessAssociate, TaxController.create);
    this.router.post('/filter', accessClient, TaxController.filter);
    this.router.post('/update', accessAssociate, TaxController.update);
    this.router.post('/markfordelete', accessAssociate, TaxController.markDelete);
    this.router.post('/delete', accessAdmin, TaxController.delete);

    return this.router;
  }
}