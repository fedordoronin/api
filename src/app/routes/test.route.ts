import { Router, Request, Response, NextFunction } from 'express';
import { MailingService } from '../components/mailing/mailing.service';

export class TestRoute {
  constructor (
    private router: Router = Router()
  ) {}

  get routes () {
    
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
        // res.send('Hello i am App');

        MailingService.removeUnusedFiles();

        res.json('ok');
    });

    return this.router;
  }
}