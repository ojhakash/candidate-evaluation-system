import { Request, Response } from "express";
import dotenv from "dotenv";
import AuthControlFactory from "../../utils/authControl/AuthControlFactory";
import BaseUsecase from "../../Common/usecase/BaseUsecase";
import HttpError from "standard-http-error";
import BcryptHashControl from "../../utils/hashControl/BcryptHashControl";
import { HashControlInterface } from "../../utils/hashControl/HashControlInterface";
import AdminRepository from "../repository/AdminRepository";
import JwtAuthControl from "../../utils/authControl/JwtAuthControl";

export default class SigninAdminUsecase extends BaseUsecase {
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

  validate() {
    let { email, password } = this.request.body;
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

      let { email, password } = this.request.body;
      let admin = await this.adminRepository.getAdminById(email);
      admin.password = password;
      if (!admin.verified) {
        throw new HttpError(403, "Please verify your email.");
      }
      if (!admin.verifyPassword()) {
        throw new HttpError(403, "password incorrect");
      }

      let tokenSecret = process.env.CALLBACK_AUTH_SECERT
        ? process.env.CALLBACK_AUTH_SECERT
        : "";

      let token = this.authControl.sign({ email: admin.email }, tokenSecret);
      this.response.send({
        code: 200,
        data: { email: admin.email, name: admin.userName, token },
      });
    } catch (error) {
      this.response.send({ code: error.code, message: error.message });
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new SigninAdminUsecase(
      request,
      response,
      new AdminRepository(),
      new AuthControlFactory()
    );
    return useCase;
  }
}
