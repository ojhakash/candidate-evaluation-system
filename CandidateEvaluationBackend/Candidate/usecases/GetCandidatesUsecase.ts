import { Request, Response } from "express";

import BaseUsecase from "../../Common/usecase/BaseUsecase";
import CandidateRepository from "../repository/CandidateRepository";

export default class GetCandidatesUsecase extends BaseUsecase {
  candidateRepository: CandidateRepository;
  constructor(
    request: any,
    response: Response,
    candidateRepository: CandidateRepository
  ) {
    super(request, response);
    this.candidateRepository = candidateRepository;
  }

  validate() {}

  async execute() {
    try {
      this.validate();
      await this.authenticate();
      const candidates = await this.candidateRepository.getCandidates();
      const candidatesJSON = candidates.map(candidate=>candidate.toJSON())
      this.response.send({ data: candidatesJSON });
    } catch (error) {
      this.response.send(error);
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new GetCandidatesUsecase(
      request,
      response,
      new CandidateRepository()
    );
    return useCase;
  }
}
