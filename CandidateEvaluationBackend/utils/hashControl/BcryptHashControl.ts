import { genSaltSync, hashSync, compareSync, compare } from "bcrypt";
import { HashControlInterface } from "./HashControlInterface";
import HttpError from "standard-http-error";

export default class BcryptHashControl implements HashControlInterface {
  constructor() {}

  hash(password: string): string {
    try {
      let salt = genSaltSync(10);
      let hashedPassword = hashSync(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new HttpError(500, "Internal Sever Error");
    }
  }

  compare(candidatePassword: string, hashedPassword: string): boolean {
    try {
      let comparisionResult = compareSync(candidatePassword, hashedPassword);
      return comparisionResult;
    } catch (error) {
      return false;
    }
  }
}
