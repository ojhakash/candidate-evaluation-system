import BaseViewModel from "./BaseViewModel";
import strings from "../resources/strings";
import Constans from "../resources/Constans";

export default class SigninViewModel extends BaseViewModel {
  constructor(adminRepository) {
    super();
    this.adminRepository = adminRepository;
    this.state = this.defaultState();
  }

  defaultState() {
    return {
      email: "",
      password: "",
      error: null,
      suucess: null,
    };
  }

  isValid() {
    let error;
    try {
      if (this.validationUtils.isEmpty(this.state.email) === true) {
        error = Error(strings.error_empty_email);
        this.setState({
          ...this.state,
          error,
        });
      } else if (
        this.validationUtils.isEmailValid(this.state.email) === false
      ) {
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
    } catch (error) {
      this.setState({
        ...this.state,
        error,
      });
    }
  }

  onSigninUser = async () => {
    this.isValid();

    try {
      let response;
      if (!this.state.error) {
        let data = {
          email: this.state.email,
          password: this.state.password,
        };
        let result = await this.adminRepository.signin(data);
        if (result.code != 200 && result.message) {
          let error = new Error(result.message);
          this.setState({ ...this.state, error: error });
          return;
        } else if (result.code == 200) {
          localStorage.setItem(Constans.LOGGED_IN_TOKEN, result.data.token);
          this.setState({
            ...this.state,
            success: "Logged in successfully.",
          });
          return;
        }

        let errorObj = new Error(strings.error_something_went_wrong);
        this.setState({ ...this.state, error: errorObj });
      }
    } catch (error) {}
  };
}
