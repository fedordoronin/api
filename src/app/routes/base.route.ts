import * as express from 'express';

//Middlewares
import checkUserToken from "../middlewares/checkUserToken.middleware";

//Routes
import { UserRoute } from './user.route';
import { SecurityRoute } from "./security.route";
import { CompanyRoute } from './company.route';
import { PositionRoute } from './position.route';
import { TaxRoute } from './tax.route';
import { TestRoute } from './test.route';
import { NewsRoute } from './news.route';
import { MessageRoute } from './message.route';
import { MailingRoute } from './mailing.route';
import { FileRoute } from './file.route';

export class BaseRoute {
  
  constructor (
    private app: express.Application = express()
  ) {
    
  }
  
  get init (): express.Application {

    this.app.use('/test', new TestRoute().routes);

    this.app.use('/security', new SecurityRoute().routes);
    this.app.use('/user', checkUserToken, new UserRoute().routes);
    this.app.use('/company', checkUserToken, new CompanyRoute().routes);
    this.app.use('/position', checkUserToken, new PositionRoute().routes);
    this.app.use('/tax', checkUserToken, new TaxRoute().routes);
    this.app.use('/news', checkUserToken, new NewsRoute().routes);
    this.app.use('/message', checkUserToken, new MessageRoute().routes);
    this.app.use('/mailing', checkUserToken, new MailingRoute().routes);
    this.app.use('/file', checkUserToken, new FileRoute().routes);

    return this.app;
  }
}