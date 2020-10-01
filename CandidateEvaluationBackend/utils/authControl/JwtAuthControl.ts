import { sign, verify } from "jsonwebtoken";
import HttpError from "standard-http-error";
import { RequestCustom } from "../types/RequestCustom";

import { AuthControlInterface } from "./AuthControlInterface";

export default class JwtAuthControl implements AuthControlInterface {

  sign(valueToEncode: any, secret: string) {
    try {
      if(!secret){
        throw new HttpError(500,"Internal Server Error")
      }
      let token = sign({ payload: valueToEncode }, secret);
      return token;
    } catch (error) {
      throw new HttpError(500, "InternalServerError");
    }
  }

  decode(token: string, secret: string) {
    try {
      if(!secret){
        throw new HttpError(500,"Internal Server Error")
      }
      let decoded: any = verify(token, secret);
      return decoded["payload"];
    } catch (error) {
      throw new HttpError(401, "Unauthorized");
    }
  }

  decodeRequestHeader(req: RequestCustom, secret: string) {
    try {
      let token = req.headers.authorization;
      return this.decode(token, secret);
    } catch (error) {
      throw new HttpError(401, "Unauthorized");
    }
  }

}
