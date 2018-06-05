import * as fs from "fs";

import config from "../../../config";
import logger from "../../../lib/log";

export class FileService {

    /**
     * Загрузка и сохранение файлов на диске
     * 
     * @param files 
     */
    static async upload (files: any) {
        logger.debug('Start upload files:', files);

        let names: string[] = [];
        
        for (let file of files) {

            let path: string = config.get('files:upload') + '/' + file.originalname;
            let temp = fs.readFileSync(file.path);

            try {     
                if (!fs.existsSync(config.get('files:upload'))){
                    fs.mkdirSync(config.get('files:upload'));
                }
    
                if (!fs.existsSync(path)) {
                    logger.debug('File is empty, saved: ' + path);
                    fs.writeFileSync(path, temp, { flag: 'wx' });
                    fs.unlinkSync(file.path);
                    names.push(file.originalname);
                } else {
                    logger.debug('File has, not saved:' + file.originalname);
                    names.push(file.originalname);
                    fs.unlinkSync(file.path);
                }
            } catch (error) {
                throw error;
            }

        }

        logger.debug('Files uploaded:', names);

        return names;
    }

    /**
     * Удаление файлов
     * 
     * @param files 
     */
    static async remove (files: string[]) {

        let uploadDir = config.get('files:upload') + '/';

        if (files.length > 0) {
            for (let file of files) {
                if (fs.existsSync(uploadDir + file)) {
                    fs.unlink(uploadDir + file, err => {
                        if (err) throw err;
                    });
                }
            }
        }
    }

}