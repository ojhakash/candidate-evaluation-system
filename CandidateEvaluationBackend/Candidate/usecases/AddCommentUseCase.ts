import { Request, Response } from "express";
import HttpError from "standard-http-error";

import BaseUsecase from "../../Common/usecase/BaseUsecase";
import Comment from "../../domain/valuedObjects/Comment";
import CandidateRepository from "../repository/CandidateRepository";

export default class AddCommentUsecase extends BaseUsecase {
  candidateRepository: CandidateRepository;

  constructor(
    request: any,
    response: Response,
    candidateRepository: CandidateRepository
  ) {
    super(request, response);
    this.candidateRepository = candidateRepository;
  }

  validate() {
    try {
      const { candidateEmail, commentText } = this.request.body;
      if (!candidateEmail) {
        throw new HttpError(400, "candidateEmail is a required field");
      }
      if (!commentText) {
        throw new HttpError(400, "commentText is a required field");
      }
    } catch (error) {
      throw error;
    }
  }

  async execute() {
    try {
      this.validate();
      console.log("admin");

      let admin = await this.authenticate();
      console.log(admin);

      const { candidateEmail, commentText } = this.request.body;
      console.log(candidateEmail, commentText);
      const comment = new Comment(candidateEmail, this.userId, commentText);
      await this.candidateRepository.addCommentToCandidateByCandidateId(
        comment
      );
      this.response.send({ comment: 200, data: comment.getJSON() });
    } catch (error) {
      this.response.send(error);
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new AddCommentUsecase(
      request,
      response,
      new CandidateRepository()
    );
    return useCase;
  }
}
