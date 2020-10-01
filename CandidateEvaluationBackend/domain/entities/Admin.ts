import BcryptHashControl from "../../utils/hashControl/BcryptHashControl";
import { HashControlInterface } from "../../utils/hashControl/HashControlInterface";

export default class Admin {
  private _userName: string;
  private _email: string;
  private _password: string;
  private _hashedPassword: string;
  private _adminId: string = '';
  private bcryptHashControl: HashControlInterface = new BcryptHashControl();
  constructor(
    userName: string,
    email: string,
    password: string,
    hashedPassword: string = ""
  ) {
    this._userName = userName;
    this._email = email;
    this._password = this.bcryptHashControl.hash(password);
    this._hashedPassword = hashedPassword;
  }

  public get userName(): string {
    return this._userName;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  
  public get adminId() : string {
    return this._adminId;
  }

  
  public set adminId(v : string) {
    this._adminId = v;
  }
  

  public set userName(v: string) {
    this._userName = v;
  }
  public set password(v: string) {
    this._password = v;
  }

  public verifyPassword() {
    return this.bcryptHashControl.compare(this._password, this._hashedPassword);
  }
  public authenticateUser(passwpord: string) {}
  public authorizeUser(token: string) {}
}
