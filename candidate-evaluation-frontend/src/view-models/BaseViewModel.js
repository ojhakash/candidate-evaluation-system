import axios from "axios";
import { ValidationUtils } from '../core/ValidationUtils';

export default class BaseViewModel {
  constructor() {
    this.validationUtils = new ValidationUtils()
  }

  createCancellationSource() {
    if (this.cancellationSource) {
      this.cancellationSource.cancel();
    }
    const CancelToken = axios.CancelToken;
    this.cancellationSource = CancelToken.source();
  }

  setState(newState) {
    this.state = newState;
  }

  getState() {
    return this.state;
  }

  clearError() {
    this.setState({
      ...this.state,
      error: undefined,
    });
  }

  defaultState() {
    return {};
  }

  reset() {
    this.setState(this.defaultState());
  }

  set(key, value) {
    const newState = {
      ...this.state,
    };
    newState[key] = value;
    this.setState(newState);
  }
}
