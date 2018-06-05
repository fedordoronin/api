import { Router, Request, Response, NextFunction } from 'express';

import accessAdmin from "../middlewares/accessAdmin.middleware";
import accessClient from "../middlewares/accessClient.middleware";
import accessAssociate from "../middlewares/accessAssociate.middleware";

import { CompanyController } from '../components/company/company.controller';

export class CompanyRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {
    
    this.router.get('/', accessClient, CompanyController.getAll);
    this.router.get('/user/:user', accessAssociate, CompanyController.getAllByUser);
    this.router.get('/:_id', accessClient, CompanyController.getById);
    this.router.put('/', accessAssociate, CompanyController.create);
    this.router.post('/delete', accessAdmin, CompanyController.delete);
    this.router.post('/:_id', accessAdmin, CompanyController.update);
    this.router.post('/mfd/:_id', accessAssociate, CompanyController.update);

    return this.router;
  }
}