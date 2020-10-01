import JwtAuthControl from "./JwtAuthControl";

export default class AuthControlFactory {
  create() {
    let authControl = new JwtAuthControl();
    return authControl;
  }
}
