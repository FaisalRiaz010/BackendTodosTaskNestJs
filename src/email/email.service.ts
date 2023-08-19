/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    // Create a test account using Ethereal Email
    const testAccount = await nodemailer.createTestAccount();

    // Create a Nodemailer transporter using the test account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: 'm.foggyfaisal@gmail.com',
      to,
      subject,
      text,
    });

    // Log the Ethereal Email URL where you can view sent emails
    console.log('Ethereal Email URL:', nodemailer.getTestMessageUrl(info));
  }
}

//Follwoing Article link below
// https://rajveerchoudhary8440.medium.com/how-to-schedule-email-using-cron-jobs-in-nodejs-6bcedd2b38af