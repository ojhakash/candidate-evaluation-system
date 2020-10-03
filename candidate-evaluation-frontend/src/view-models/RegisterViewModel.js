import BaseViewModel from "./BaseViewModel";
import strings from "../resources/strings";

export default class RegisterViewModel extends BaseViewModel {
  constructor(adminRepository) {
    super();
    this.adminRepository = adminRepository;
    this.state = this.defaultState();
  }

  defaultState() {
    return {
      userName: "",
      email: "",
      password: "",
      error: null,
      suucess: null,
    };
  }

  isValid() {
    let error;
    if (this.validationUtils.isEmpty(this.state.email) === true) {
      error = Error(strings.error_empty_userName);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.validationUtils.isEmpty(this.state.email) === true) {
      error = Error(strings.error_empty_email);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.validationUtils.isEmailValid(this.state.email) === false) {
      error = Error(strings.error_invalid_email);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.validationUtils.isEmpty(this.state.password) === true) {
      error = Error(strings.error_empty_password);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.state.password.length < 6) {
      error = Error(strings.error_short_password);
      this.setState({
        ...this.state,
        error,
      });
    }
  }

  onRegisterUser = async () => {
    this.isValid();
    let response;
    if (!this.state.error) {
      let data = {
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
      };

      let result = await this.adminRepository.register(data);
      if (result.code != 200 && result.message) {
        let error = new Error(result.message);
        this.setState({ ...this.state, error: error });
        return;
      } else if (result.code == 200) {
        this.setState({
          ...this.state,
          success: "Please verfy your email by clicking on the link.",
        });
        return;
      }

      let errorObj = new Error(strings.error_something_went_wrong);
      this.setState({ ...this.state, error: errorObj });
    }
  };
}
