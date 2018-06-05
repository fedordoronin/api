import { App } from '../app';
import conf from '../config';

import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import * as fs from 'fs';

import logger from '../lib/log';

class Server {
    private app: express.Application;
    private appClass: App;
    private httpPort: number;
    private httpServer: http.Server;
    private httpsServer: https.Server;

    constructor () {
        this.appClass = App.bootstrap;
        this.app = this.appClass.app;
        this.httpPort = this.normalizePort(process.env.PORT || conf.get('PORT') || 3000);
        
        this.server();
        this.dataBase();

    }

    /**
     * Starting server
     */
    server () {
        this.app.set('port', this.httpPort);
        
        this.httpServer = http.createServer(this.app);
        
        this.httpServer.listen(this.httpPort, () => {
            this.onListening(this.httpServer);
        });
        
        this.httpServer.on('error', this.onError);

        // if (process.env.NODE_ENV === "production") {
        //     try {     
        //         var privateKey  = fs.readFileSync(conf.get('ssl:key'), 'utf8');
        //         var certificate = fs.readFileSync(conf.get('ssl:cert'), 'utf8');
        //     } catch (error) {
        //         throw error;
        //     }
            
        //     var credentials = {key: privateKey, cert: certificate};

        //     this.httpsServer = https.createServer(credentials, this.app);

        //     this.httpsServer.listen(8443, () => {
        //         console.log('HTTPS Server listening on 8443 port.');
        //     });

        //     this.httpsServer.on('error', this.onError);
        // }
    }

    /**
     * Connect database
     */
    dataBase () {
        let serverDb = conf.get('db:local');

        // if (process.env.NODE_ENV == 'production') {
        //     serverDb = conf.get('db:cloud')
        // }

        (<any>mongoose).Promise = bluebird;
        mongoose.connect(serverDb, { useMongoClient: true })
            .then(() => {
                console.log(`Mongo connected: ${serverDb}`);
                this.appClass.init();
            })
            .catch(err => {
                if (err) throw err;
            });
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort(val: any) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error: any) {
        if (error.syscall !== "listen") {
            throw error;
        }

        var bind = typeof this.httpPort === "string"
            ? "Pipe " + this.httpPort
            : "Port " + this.httpPort;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    onListening(server: http.Server) {
        var addr = this.httpServer.address();
        var bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        console.log("Listening on " + bind);
    }
}

const server = new Server();