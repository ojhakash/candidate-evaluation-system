import BaseViewModel from "./BaseViewModel";
import Strings from "../resources/strings";

export default class CandidateDetailsViewModel extends BaseViewModel {
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
      commentText: "",
      attachment: null,
      comments: [],
      rating: 0,
      myGivenRating: 0,
    };
  }

  async getCadidateDetails(candidateEmail) {
    try {
      let result = await this.candidateRepository.getCadidateDetails(
        candidateEmail
      );
      if (result.code == 200) {
        this.setState({
          ...this.state,
          email: result.data.email,
          name: result.data.name,
          webAddress: result.data.web_address,
          coverLetter: result.data.cover_letter,
          ip: result.data.ip,
          location: result.data.location,
          comments: result.data.comments,
        });
        let avgRaing = result.data.ratings.reduce(function (
          accumulator,
          currentValue,
          currentIndex
        ) {
          return (accumulator + currentValue.rating) / (currentIndex + 1);
        },
        0);
        this.setState({ ...this.state, rating: avgRaing });
      }
      return result;
    } catch (error) {
      let errorObj = new Error(Strings.error_something_went_wrong);
      this.setState({ ...this.setState, error: errorObj });
    }
  }

  async addComment() {
    try {
      if (!this.state.commentText) {
        let error = new Error(Strings.error_empty_comment);
        this.setState({ ...this.setState, error: error });
        return;
      }
      let result = await this.candidateRepository.addComment(
        this.state.email,
        this.state.commentText
      );
    } catch (error) {
      let errorObj = new Error(Strings.error_something_went_wrong);
      this.setState({ ...this.setState, error: errorObj });
    }
  }

  async addRating(rating) {
    try {
        if (!rating) {
          let error = new Error(Strings.error_empty_rating);
          this.setState({ ...this.setState, error: error });
          return;
        }
        let result = await this.candidateRepository.addRating(
          this.state.email,
          +rating
        );
      } catch (error) {
        let errorObj = new Error(Strings.error_something_went_wrong);
        this.setState({ ...this.setState, error: errorObj });
      }
  }
}
