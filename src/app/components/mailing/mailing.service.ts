import { Transporter, SendMailOptions } from "nodemailer";
import { IMailing } from "./mailing.interface";
import { MailingModel } from "./mailing.model";
import { Mailing } from "./mailing.scheme";
import { ICompany } from "../company/company.interface";
import { IUserModel } from "../user/user.model";

import * as mailer from "nodemailer";
import * as fs from "fs";

import config from "../../../config";
import logger from "../../../lib/log";

export class MailingService {

    public static async create (data: IMailing): Promise<MailingModel> {

        try {
            var mailing: MailingModel = await Mailing.create(data);
        } catch (error) {
            throw error;
        }

        return mailing;
    }

    public static async remove (_id: string): Promise<void> {
        try {
            var res = await Mailing.remove({ _id });
        } catch (error) {
            throw error;
        }

        try {
            await MailingService.removeUnusedFiles();
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static async update (_id: string, data: IMailing): Promise<void> {

        try {
            var res = await Mailing.update({ _id }, data);
        } catch (error) {
            throw error;
        }

        return res;
    }

    public static async getAll (): Promise<MailingModel[]> {
        try {
            var mailing: MailingModel[] = await Mailing.find()
                .populate('create_who')
                .populate('sent_who')
                .populate('sent_to')
                .sort('-date_create');
        } catch (error) {
            throw error;
        }

        return mailing;
    }

    public static async getById (_id: string): Promise<MailingModel> {
        try {
            var mailing: MailingModel = await Mailing.findById({ _id })
                .populate('create_who')
                .populate('sent_who')
                .populate('sent_to');
        } catch (error) {
            throw error;
        }

        return mailing;
    }

    /**
     * Удаление прикрепленного файла
     * 
     * @param mailing_id Id рассылки
     * @param file Название файла
     */
    public static async removeAttachment (file: string, mailing_id: string = null): Promise<void> {

        let path = config.get('files:upload') + '/';
        let mayBeRemove = true;
        
        try {
            var check: MailingModel[] = await MailingService.checkUsedFiles([file]);
        } catch (error) {
            throw error;
        }
        
        if (check.length > 0) {
            if (mailing_id) {
                for (let m of check) {
                    if (m._id != mailing_id) mayBeRemove = false;
                }
            } else {
                mayBeRemove = false;
            }
        }

        if (fs.existsSync(path + file) && mayBeRemove) {
            fs.unlinkSync(path + file);
        }

        if (mailing_id) {
            try {
                var mailing: MailingModel = await MailingService.getById(mailing_id);
            } catch (error) {
                throw error;
            }
    
            let attachments = mailing.options.attachments;
            logger.debug('Attachments:', attachments);
            logger.debug('File for delete:' + file);
            
    
            if (!mailing) {
                logger.debug('Рассылка не существует');
                return;
            }
    
            if (!attachments || attachments.length === 0) {
                logger.debug('Нет прикрепленных файлов');
                return;
            }
    
            if (!(attachments.indexOf(file) + 1)) {
                logger.debug('Такой файл не прикреплен');
                return;
            }
    
            mailing.options.attachments = attachments.filter(item => {
                return item != file;
            });
    
            try {
                var res = await MailingService.update(mailing_id, mailing);
            } catch (error) {
                throw error;
            }

            return res;
        }

        return;
    }

    /**
     * Отправка писем
     * 
     * @param mailing_id  Id рассылки
     * @param user Пользователь
     */
    public static async sendMailing (mailing_id: string, user: IUserModel): Promise<any> {
        return new Promise( async (resolve, reject) => {

            try {
                var mailing: MailingModel = await Mailing.findById({ _id: mailing_id }).populate('sent_to'); 
            } catch (error) {
                throw error;
            }
    
            if (!mailing) throw { message: 'No find mailing!' };
    
            let transporter: Transporter = mailer.createTransport(config.get('mailing'));
    
            let message = {
                from: mailing.options.from,
                to: mailing.options.to,
                subject: mailing.options.subject,
                html: mailing.options.html,
                attachments: []
            };

            if (mailing.options.attachments) {
                for (let file of mailing.options.attachments) {
                    message.attachments.push({ 
                        filename: file,
                        path: config.get('files:upload') + '/' + file
                     });
                }
            };

            let pList: Array<Promise<any>> = [];

            for (let to of mailing.sent_to) {
                
                let p = new Promise((resolve, reject) => {
                    message.to = to.email;
                    transporter.sendMail(message, (error, info) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(info);
                    });
                });
                
                pList.push(p);
            }

            Promise.all(pList)
                .then(res => {

                    let data: IMailing = {
                        sent : true,
                        sent_who : user,
                        date_sent : new Date()
                    } 
        
                    MailingService.update(mailing_id, data);
        
                    logger.debug('Email send response:', res);
                    return resolve();  
                })
                .catch(err => {
                    logger._error('Error send mailing:', err);
                    return reject(err);
                });
        });
    }

    /**
     * Проверка используется ли файл в рассылках
     * 
     * @param files Массив названий файлов string
     */
    private static async checkUsedFiles (files: string[]) {
        try {
            var mailing: MailingModel[] = await Mailing.find({ 'options.attachments' : { $in : files } });
        } catch (error) {
            throw error;
        }

        return mailing;
    }

    /**
     * Удаление не используемых файлов
     */
    static async removeUnusedFiles (): Promise<void> {
        let path = config.get('files:upload') + '/';

        try {
            fs.readdir(path, async (err, files) => {
                for (let file of files) {
                    if (fs.lstatSync(path + file).isFile()) {
                        let check = await MailingService.checkUsedFiles([file]);
                        if (check.length === 0) {
                            fs.unlink(path + file, err => {
                                if (err) throw err;
                            });
                            logger.debug('Remove unused file: ', file);
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }
}