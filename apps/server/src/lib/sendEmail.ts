/* eslint-disable no-async-promise-executor */
import path from 'node:path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import redis from './redis.js'
import type { MailInfo, RedisData, ResponseData, SendMailParams } from '@server/types';



export const sendMail = async (params: SendMailParams): Promise<ResponseData> => {
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
  return new Promise(async resolve => {
    const transporter = nodemailer.createTransport({
      host: 'sg1-ts103.a2hosting.com',
      port: 465,
      auth: {
        user: process.env.MAIL as string,
        pass: process.env.PASS as string
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    const handlebarsOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: undefined
      },
      viewPath: path.resolve('./src/views'),
      extName: '.handlebars'
    };
    transporter.use('compile', hbs(handlebarsOptions));

    const info: MailInfo = {
      from: `ZENX BOT <${process.env.MAIL}>`, // sender address
      to: params.email,
      subject: params.subject, // Subject line
      template: params.template,
      context: { params }
    };
    if (params.cc) {
      info.cc = params.cc;
    }
    function mailSend() {
      transporter.sendMail(info, async err => {
        if (!err) {
          const responseData: ResponseData = {
            status: true,
            message: 'commonmessage.mailsendsuccess'
          };
          resolve(responseData);
        } else {
          const responseData: ResponseData = {
            status: false,
            message: err.message
          };
          resolve(responseData);
        }
      });
    }
    const obj = {
      from: info.from,
      to: info.to,
      subject: info.subject,
      sendingTime: `${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`
    };
    const redisValue = await redis.get('NodeMail');
    const redisData: RedisData | null = redisValue ? JSON.parse(redisValue) : null;
    if (redisData) {
      let data: RedisData = {} as RedisData;
      const currentDate = new Date().toLocaleDateString();
      if (redisData.date === currentDate) {
        if (redisData.mailCount && Number(redisData.mailCount) + 1 <= 150) {
          redisData.details.push(obj);
          data = {
            date: redisData.date,
            mailCount: Number(redisData.mailCount) + 1,
            startTime: redisData.startTime,
            details: redisData.details
          };
          await redis.set('NodeMail', JSON.stringify(data));
          return mailSend();
        }
        const responseData: ResponseData = {
          status: false,
          message: 'Today MailSend Limit Reached'
        };
        resolve(responseData);
      } else if (redisData.date !== currentDate) {
        data = {
          date: currentDate,
          mailCount: 1,
          startTime: new Date().toLocaleTimeString(),
          details: [obj]
        };
        await redis.set('NodeMail', JSON.stringify(data));
        mailSend();
      }
    } else {
      const arr = [obj];
      const data: RedisData = {
        date: new Date().toLocaleDateString(),
        mailCount: 1,
        startTime: new Date().toLocaleTimeString(),
        details: arr
      };
      await redis.set('NodeMail', JSON.stringify(data));
      mailSend();
    }
  });
};
