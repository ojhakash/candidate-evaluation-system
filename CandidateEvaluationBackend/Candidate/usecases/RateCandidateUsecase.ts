import { Request, Response } from "express";

import BaseUsecase from "../../Common/usecase/BaseUsecase";
import CandidateRepository from "../repository/CandidateRepository";
import Rating from "../../domain/valuedObjects/Rating";
import HttpError from "standard-http-error";

export default class RateCandidateUsecase extends BaseUsecase {
  private candidateRepository: CandidateRepository;
  constructor(
    request: any,
    response: Response,
    candidateRepository: CandidateRepository
  ) {
    super(request, response);
    this.candidateRepository = candidateRepository;
  }

  async validate() {
    const { candidateEmail, ratedVal } = this.request.body;
    if (!candidateEmail) {
      throw new HttpError(400, "candidateEmail is a required field");
    }
    if (!ratedVal) {
      throw new HttpError(400, "ratedVal is a required field");
    }
    if (typeof ratedVal != "number") {
      throw new HttpError(400, "ratedVal should be a number");
    }
    if (ratedVal > 5 || ratedVal < 1) {
      throw new HttpError(400, "ratedVal should be between 1 to 5");
    }
    
  }

  async execute() {
    try {
      await this.validate();
      await this.authenticate();
      const { candidateEmail, ratedVal } = this.request.body;
      const rating = new Rating(candidateEmail, this.userId, ratedVal);
      await this.candidateRepository.addRatingToCandidateByCandidateId(rating);
      this.response.send({ comment: 200, data: rating.getJSON() });
    } catch (error) {
      this.response.send(error);
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new RateCandidateUsecase(
      request,
      response,
      new CandidateRepository()
    );
    return useCase;
  }
}
