import { Request, Response } from "express";
import HttpError from "standard-http-error";
import dotenv from "dotenv";

import AuthControlFactory from "../../utils/authControl/AuthControlFactory";
import { RequestCustom } from "../../utils/types/RequestCustom";
import AdminRepository from '../../Admin/repository/AdminRepository';

dotenv.config();

export default class BaseUsecase {
  public request: RequestCustom;
  public response: Response;
  protected userId:string;
  constructor(request: RequestCustom, response: Response) {
    this.request = request;
    this.response = response;
    this.userId = '';
  }

  async authenticate() {
    try {
      let token: any = this.request.headers.authorization;
      let authControl = new AuthControlFactory().create();

      let payload = authControl.decode(
        token,
        process.env.AUTHENTICATION_SECERT
          ? process.env.AUTHENTICATION_SECERT
          : ""
      );
      let email:any = payload.email;

      if (email == undefined) {
        throw new HttpError(401, "UnAuthorized");
      }
      
      let adminRepository = new AdminRepository();
      let admin = await adminRepository.getAdminById(email);
      
      this.userId = admin.adminId;
      return admin;
    } catch (error) {
      throw error;
    }
  }
}
