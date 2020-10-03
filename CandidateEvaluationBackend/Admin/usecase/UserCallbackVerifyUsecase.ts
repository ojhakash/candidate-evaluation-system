import { Request, Response } from "express";
import dotenv from "dotenv";
import Admin from "../../domain/entities/Admin";
import AuthControlFactory from "../../utils/authControl/AuthControlFactory";
import BaseUsecase from "../../Common/usecase/BaseUsecase";
import HttpError from "standard-http-error";
import User from "../../Common/Models/User";
import BcryptHashControl from "../../utils/hashControl/BcryptHashControl";
import { HashControlInterface } from "../../utils/hashControl/HashControlInterface";
import AdminRepository from "../repository/AdminRepository";
import JwtAuthControl from "../../utils/authControl/JwtAuthControl";

export default class UserCallbackVerifyUsecase extends BaseUsecase {
  private bcryptHashControl: HashControlInterface = new BcryptHashControl();
  private adminRepository: AdminRepository;
  private authControl: JwtAuthControl;

  constructor(
    request: any,
    response: Response,
    adminRepository: AdminRepository,
    authControlFactory: AuthControlFactory
  ) {
    super(request, response);
    this.adminRepository = adminRepository;
    this.authControl = authControlFactory.create();
  }

  validate() {}

  async execute() {
    try {
      this.validate();

      let tokenSecret = process.env.CALLBACK_AUTH_SECERT
        ? process.env.CALLBACK_AUTH_SECERT
        : "";

      let payload = this.authControl.decode(
        this.request.params.callbackToken,
        tokenSecret
      );
      
      let admin = await this.adminRepository.getAdminById(payload['email']);
      await this.adminRepository.verifyAdmin(admin);

      let frontendUrl:any = process.env.frontendUrl;
      this.response.redirect(frontendUrl)
    } catch (error) {
      this.response.send({ code: error.code, message: error.message });
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new UserCallbackVerifyUsecase(
      request,
      response,
      new AdminRepository(),
      new AuthControlFactory()
    );
    return useCase;
  }
}
