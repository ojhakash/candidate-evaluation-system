import axios from "axios";
import Constants from "../../resources/Constans";
// import FileSaver from 'file-saver';

export class ApiManager {
  constructor(preferences) {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    this.preferences = preferences;
  }

  async defaultHeaders() {
    const headers = {};
    const loginToken = localStorage.getItem(Constants.LOGGED_IN_TOKEN);
    if (loginToken != undefined) {
      headers.authorization = loginToken;
    }
    headers["Content-Type"] = "application/json";
    return headers;
  }

  processError(error) {
    if (axios.isCancel(error)) {
      return null;
    } else {
      if (error.response && error.response.data) {
        if (error.response.data.status) {
          const message = error.response.data.status;
          return Error(message);
        } else if (error.response.data.error) {
          const message = error.response.data.error;
          return Error(message);
        } else {
          return error;
        }
      } else {
        return error;
      }
    }
  }

  async registerUser(data) {
    try {
      const headers = await this.defaultHeaders();
      const response = await axios.post("admin/register", data, {
        headers,
      });
      return response.data;
    } catch (error) {
      const processedError = this.processError(error);
      if (processedError) {
        throw processedError;
      }
    }
  }

  async signinUser(data) {
    try {
      const headers = await this.defaultHeaders();
      const response = await axios.post("admin/signin", data, {
        headers,
      });
      return response.data;
    } catch (error) {
      const processedError = this.processError(error);
      if (processedError) {
        throw processedError;
      }
    }
  }

  async addCandidate(data) {
    try {
      const headers = await this.defaultHeaders();
      const response = await axios.post("candidate/add", data, {
        headers,
      });
      return response.data;
    } catch (error) {
      const processedError = this.processError(error);
      if (processedError) {
        throw processedError;
      }
    }
  }

  async getCandidates(rating) {
    try {
      const headers = await this.defaultHeaders();
      const response = await axios.get(`candidate/all?rating=${rating}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      const processedError = this.processError(error);
      if (processedError) {
        throw processedError;
      }
    }
  }

  async getCadidateDetails(candidateEmail) {
    try {
      const headers = await this.defaultHeaders();
      const response = await axios.get(`candidate/${candidateEmail}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      const processedError = this.processError(error);
      if (processedError) {
        throw processedError;
      }
    }
  }

  async addComment(email, commemtText) {
    try {
      let body = {
        candidateEmail: email,
        commentText: commemtText,
      };
      const headers = await this.defaultHeaders();
      const response = await axios.post(`candidate/comment/add`, body, {
        headers,
      });
      return response.data;
    } catch (error) {
      const processedError = this.processError(error);
      if (processedError) {
        throw processedError;
      }
    }
  }

  async addRating(email,rating){
    try {
        let body = {
          candidateEmail: email,
          ratedVal: rating,
        };
        const headers = await this.defaultHeaders();
        const response = await axios.post(`candidate/rating/add`, body, {
          headers,
        });
        return response.data;
      } catch (error) {
        const processedError = this.processError(error);
        if (processedError) {
          throw processedError;
        }
      }      
  }
}
