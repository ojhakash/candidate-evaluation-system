import { ApiManager } from "../domain/api/ApiManager";
import { UserRepository } from "../domain/repository/UserRepository";
import { AdminRepository } from "../domain/repository/AdminRepository";
import { ValidationUtils } from "../core/ValidationUtils";
import RegisterViewModel from "../view-models/RegisterViewModel";
import AddCandidateViewModel from '../view-models/AddCandidateViewModel';
import CandidateDetailsViewModel from '../view-models/CandidateDetailsViewModel';
import SigninViewModel from '../view-models/SigninViewModel';
import ListCandidateViewModel from '../view-models/ListCandidateViewModel';

export class DependencyInjector {
  static dependencyInjector
  constructor(preferences) {
    this.apiManager = new ApiManager(localStorage);
    this.validationUtils = new ValidationUtils();
    this.userRepository = new UserRepository(this.apiManager, preferences);
    this.adminRepository = new AdminRepository(this.apiManager, preferences);
    this.registerUserViewModel = new RegisterViewModel(this.userRepository);
    this.addCandidateViewModel = new AddCandidateViewModel(
      this.userRepository
    );
  }

  static initialize() {
    if (!this.dependencyInjector) {
      this.dependencyInjector = new DependencyInjector(localStorage);
    }
  }

  static default() {
    return this.dependencyInjector;
  }

  provideRegisterUserViewModel() {
    this.registerUserViewModel = new RegisterViewModel(this.adminRepository);
    return this.registerUserViewModel;
  }

  provideSigninUserViewModel() {
    this.registerUserViewModel = new SigninViewModel(this.adminRepository);
    return this.registerUserViewModel;
  }

  provideAddCandidateViewModel() {
    this.addCandidateViewModel = new AddCandidateViewModel(
      this.userRepository
    );
    return this.addCandidateViewModel;
  }

  provideListCandidateViewModel() {
    this.listCandidateViewModel = new ListCandidateViewModel(
      this.userRepository
    );
    return this.listCandidateViewModel;
  }


  provideCandidateDetailsViewModel() {
    this.addCandidateViewModel = new CandidateDetailsViewModel(
      this.userRepository
    );
    return this.addCandidateViewModel;
  }
}
