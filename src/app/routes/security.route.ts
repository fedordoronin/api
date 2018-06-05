import { Router, Request, Response, NextFunction } from 'express';

import {SecurityController} from "../components/security/security.controller";
import { RoleController } from '../components/role/role.controller';

export class SecurityRoute {
    constructor (
        private router: Router = Router()
    ) {}

    get routes () {

        this.router.post('/signIn', SecurityController.signIn);
        this.router.get('/roles', RoleController.getAll);
        this.router.post('/role/add', RoleController.add);

        return this.router;
    }
}