import nodemailer from "nodemailer";
import HttpError from "standard-http-error";
import dotenv from "dotenv";

dotenv.config();

export default class EmailService {
  private emailId: any;
  private userName: any;
  private password: any;
  private senderId: any;
  private smtpHost: any;

  constructor() {
    this.emailId = process.env.mailId;
    this.userName = process.env.smtpUserName;
    this.password = process.env.smtpPassword;
    this.senderId = process.env.mailSenderId;
    this.smtpHost = process.env.smtpHost;
  }

  async sendMail(
    name: string,
    to: string,
    subject: string,
    body: string,
    cc: string,
    bcc: string
  ) {
    try {      
      let transporter = nodemailer.createTransport({
        host: this.smtpHost,
        port: 587,
        auth: {
          user: this.userName,
          pass: this.password,
        },
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: `"${this.senderId}" <${this.emailId}>`,
        to: to,
        cc: cc,
        subject: subject,
        html: body,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new HttpError(400, "Unable to send email");
    }
  }
}
