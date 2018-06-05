import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'intel';
import * as cors from 'cors';
import * as helmet from "helmet";

import { BaseRoute } from "./routes/base.route";
import conf from '../config';

//Middlewares
import errorHandler from './middlewares/errorHandler.middleware';
import { Role } from './components/role/role.schema';
import { Position } from './components/position/position.schema';
import { CorsOptions } from 'cors';

export class App {
  public app: express.Application;

  /**
   * App bootstrap
   */
  public static get bootstrap (): App {
    return new App();
  }

  constructor () {

    conf.set('files:temp', path.resolve(__dirname, '../../public/files/temp'));
    conf.set('files:upload', path.resolve(__dirname, '../../public/files/'));

    this.app = express();
    this.configuration();
    this.routes();
  }

  //initialization
  async init () {
    try {
        var roles = await Role.find();
    } catch (err) {
        throw err;
    }

    if (roles.length === 0) {
        roles = conf.get('roles');
        let keys = Object.keys(roles);

        for (let i = 0; i < keys.length; i++) {
          try {
            Role.create(roles[keys[i]]);
          } catch (error) {
            throw error;
          }
        }
    }

    try {
      var positions = await Position.find();
    } catch (error) {
      throw error;
    }

    if (positions.length === 0) {
      positions = conf.get('positions');

      for (let position of positions) {
        try {
          Position.create(position);
        } catch (error) {
          throw error;
        }
      }
    }

  }

  //cors options
  private corsOptions (): CorsOptions {
    let options: CorsOptions = {
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTION'],
      credentials: true
    } 

    return options;
  }

  /**
   * Configure application
   */
  private configuration () { 

    this.app.use(cors(this.corsOptions()));
    this.app.use(helmet());
    
    //use json form parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    
    //use cookie parser
    this.app.use(cookieParser(conf.get('secrets:cookie')));

    //global promises
    global.Promise = require('bluebird').Promise;
  }

  private routes () {
    //add static paths
    this.app.use('/public', express.static(path.resolve(__dirname, '../../public')));
    this.app.use(new BaseRoute().init);
    this.app.use(errorHandler);
  }


}