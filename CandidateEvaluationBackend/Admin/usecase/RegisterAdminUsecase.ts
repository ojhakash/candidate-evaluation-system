import { Request, Response } from "express";

import Admin from "../../domain/entities/Admin";
import BaseUsecase from "../../Common/usecase/BaseUsecase";
import AdminRepository from "../repository/AdminRepository";
import HttpError from "standard-http-error";
import EmailService from "../../Common/Services/Emailservice";
import JwtAuthControl from "../../utils/authControl/JwtAuthControl";
import AuthControlFactory from "../../utils/authControl/AuthControlFactory";


export default class RegisterAdminUsecase extends BaseUsecase {
  emailService:EmailService
  adminRepository: AdminRepository;
  private authControl: JwtAuthControl;

  constructor(
    request: any,
    response: Response,
    adminRepository: AdminRepository,
    emailService:EmailService,
    authControlFactory: AuthControlFactory
  ) {
    super(request, response);
    this.adminRepository = adminRepository;
    this.emailService = emailService;
    this.authControl = authControlFactory.create();
  }

  validate() {
    let { userName, email, password } = this.request.body;
    if (!userName) {
      throw new HttpError(400, "userName is a required field");
    }
    if (!email) {
      throw new HttpError(400, "email is a required field");
    }
    if (!password) {
      throw new HttpError(400, "password is a required field");
    }
  }

  async execute() {
    try {
      this.validate();
      console.log("token");
      let { userName, email, password } = this.request.body;
      let admin = new Admin(userName, email, password);
      // await this.adminRepository.registerAdmin(admin);
      let tokenSecret = process.env.AUTHENTICATION_SECERT
        ? process.env.AUTHENTICATION_SECERT
        : "";

      let token = this.authControl.sign({ email: admin.email }, tokenSecret);
      let frontendCallbackUrl = process.env.frontendCallbackUrl;

      let emailBody = `Please verify your mail.Click this link <a href='${frontendCallbackUrl}${token}'>${frontendCallbackUrl}${token}</a>`;
      await this.emailService.sendMail("Verified Email",admin.email,"email verification",emailBody,'','')
      this.response.send({ code: 200, message: "success" });
    } catch (error) {
      throw error;
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new RegisterAdminUsecase(
      request,
      response,
      new AdminRepository(),
      new EmailService(),
      new AuthControlFactory()
    );
    return useCase;
  }
}
