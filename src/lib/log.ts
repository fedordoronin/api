import * as fs from "fs";
import * as path from "path";
import * as dateFormat from "dateformat";
import * as color from "colors";

import { Request } from "express";
import conf from "../config";

//TODO
class Log {

    /**
     * Error
     */
    public _error = (message: any, object = null, req?: Request) => {
        this.writeStream(message, object, '../../' + conf.get('logs:error'), req);
    }

    /**
     * Trace
     */
    public _trace = (message: any, object = null, req?: Request) => {
        this.writeStream( message, object, '../../' + conf.get('logs:trace'), req);
    }

    /**
     * Debug
     */
    public debug = (message: any, object = null, req?: Request) => {
        this.writeStream(message, object, null, req);
    }

    private writeStream = async (message: any, object = null, file?: string, req?: Request) => {

        let time = dateFormat(new Date(), 'H:mm:ss');

        if ( typeof message != 'string') {
            message = JSON.stringify(message);
        }

        if (object) {
            if ( typeof object != 'string') {
                object = JSON.stringify(object);
            }
    
            message = message + '' + object;
        }

        let textOut = '';
        let consoleOut = '';

        if (req) {
            consoleOut += `[${color.yellow(time)}] Request body: ${color.magenta(JSON.stringify(req.body))}\n`;
            textOut += `[${time}] ${req.headers.location}\n`;
        }

        consoleOut += `[${color.yellow(time)}] ${color.magenta(message)}\n`;
        textOut += `[${time}] ${message}\n`;

        if (process.env.DEBUG == 'app' || process.env.NODE_ENV === "development") {
            process.stdout.write(consoleOut);
        } 

        //Проверка на наличие файла
        if (file) {
            const logFile = path.resolve(__dirname, file);
            
            this.existFilesLog(logFile, async exist => {
    
                try {
                    var writeStream = await fs.createWriteStream(logFile, { flags: 'a' });
                } catch (error) {
                    throw error;
                }
    
                writeStream.write(textOut);
                writeStream.pipe;
            });
        }
    }

    /**
     * Checking for a file
     * @param file path to write file log
     * @param cb callback function : return Boolean
     */
    private existFilesLog (file: string, cb: (exist: Boolean) => void) {
        if (!fs.existsSync(file)) {
            console.warn(`\x1b[32mLOGS MODULE::\x1b[0m\n\x1b[31mNo file or directory\x1b[0m\n\x1b[36mStart create file\x1b[0m`);
            try {
                fs.writeFileSync(file, '');
                console.warn('\x1b[36mFile success created\x1b[0m')
                cb(true);
            } catch (error) {
                console.warn(`\x1b[31mError create file : ${error.code}\x1b[0m`);
                try {
                    console.warn(`\x1b[36mStart create directory\x1b[0m`)
                    fs.mkdirSync(path.resolve(__dirname, '../../logs'));
                    console.warn(`\x1b[36mDirectory success created\x1b[0m`);
                } catch (error) {
                    cb(false);
                }
                
                this.existFilesLog(file, exist => {
                    cb(true);
                });
            }
            
        } else cb(true);
    }

}

const log = new Log();

export default log;
