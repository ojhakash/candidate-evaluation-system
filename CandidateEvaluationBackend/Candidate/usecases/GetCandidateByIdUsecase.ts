import { Request, Response } from "express";

import BaseUsecase from "../../Common/usecase/BaseUsecase";
import CandidateRepository from "../repository/CandidateRepository";

export default class GetCandidateByIdUsecase extends BaseUsecase {
  private candidateRepository: CandidateRepository;
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
      let candidate = await this.candidateRepository.getCandidateById(
        this.request.params.candidateId
      );
      this.response.send({ code: 200, data: candidate });
    } catch (error) {
      this.response.send(error);
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new GetCandidateByIdUsecase(
      request,
      response,
      new CandidateRepository()
    );
    return useCase;
  }
}
