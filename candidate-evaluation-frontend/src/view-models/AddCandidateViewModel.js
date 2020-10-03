import BaseViewModel from "./BaseViewModel";
import strings from "../resources/strings";

export default class AddCandidateViewModel extends BaseViewModel {
  constructor(candidateRepository) {
    super();
    this.candidateRepository = candidateRepository;
    this.state = this.defaultState();
  }

  defaultState() {
    return {
      name: "",
      email: "",
      webAddress: "",
      fondOfWorking: false,
      coverLetter: "",
      attachments: [],
      error: null,
      attachment: null,
      captcha: null,
    };
  }

  isValid() {
    let error;
    if (this.validationUtils.isEmpty(this.state.email) === true) {
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
    } else if (this.validationUtils.isEmpty(this.state.webAddress) === true) {
      error = Error(strings.error_empty_web_address);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.validationUtils.isEmpty(this.state.coverLetter) === true) {
      error = Error(strings.error_empty_cover_letter);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.validationUtils.isEmpty(this.state.attachments) === true) {
      error = Error(strings.error_empty_attachment);
      this.setState({
        ...this.state,
        error,
      });
    } else if (this.validationUtils.isEmpty(this.state.captcha) === true) {
      console.log(this.state);
      error = Error(strings.error_captcha_validate);
      this.setState({
        ...this.state,
        error,
      });
    }
  }

  readFileDataAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  }

  onDrop = async (files) => {
    try {
      this.setState({ ...this.state, attachments: files });
      const reader = new FileReader();
      if (files[0]["type"] != "application/pdf") {
        let error = Error(strings.error_pdf_file_supported);
        this.setState({
          ...this.state,
          error,
          attachments: [],
          attachment: null,
        });
        return;
      }
      let base64File = await this.readFileDataAsBase64(files[0]);
      const b64 = base64File.split(",");
      const name = `${Math.random().toString(36).slice(-5)}.pdf`;
      const file = new File(new Buffer(b64[1]), name, {
        type: b64[0].split(";")[0].split(":")[1],
      });
      this.setState({ ...this.state, attachment: base64File });
    } catch (error) {
      throw error;
    }
  };

  getError = () => {
    return this.state.error;
  };

  onAddNewCandidate = async () => {
    try {
      this.isValid();
      let response;
      if (!this.state.error) {
        response = await this.candidateRepository.addCandidate(this.state);
        if (response.code !== 200) {
          let error = new Error(response.message);
          this.setState({
            ...this.state,
            error,
            success: null,
          });
        } else {
          this.setState({
            ...this.state,
            success: strings.success_add_candidate,
            error: null,
          });
          this.reset();
        }
      }
    } catch (error) {
      let errorObj = new Error(strings.error_something_went_wrong);
      this.setState({ ...this.setState, error: errorObj });
    }
  };
}
