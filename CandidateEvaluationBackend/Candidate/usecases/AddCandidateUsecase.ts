import { Request, Response } from "express";
import HttpError from "standard-http-error";
import { lookup } from "geoip-lite";

import Candidate from "../../domain/entities/Candidate";
import Location from "../../domain/valuedObjects/Location";
import BaseUsecase from "../../Common/usecase/BaseUsecase";
import AuthControlFactory from "../../utils/authControl/AuthControlFactory";
import { RequestCustom } from "../../utils/types/RequestCustom";
import CandidateRepository from "../repository/CandidateRepository";

export default class AddCandidateUseCase extends BaseUsecase {
  private candidateRepository: CandidateRepository;
  constructor(
    request: any,
    response: Response,
    candidateRepository: CandidateRepository
  ) {
    super(request, response);
    this.candidateRepository = candidateRepository;
  }

  validate() {
    let {
      name,
      email,
      webAddress,
      coverLetter,
      attachment,
    } = this.request.body;
    if (!name) {
      throw new HttpError(400, "name is a required field");
    }
    if (!email) {
      throw new HttpError(400, "email is a required field");
    }
    if (!webAddress) {
      throw new HttpError(400, "webAddress is a required field");
    }
    if (!coverLetter) {
      throw new HttpError(400, "coverLetter is a required field");
    }
    if (!attachment) {
      throw new HttpError(400, "attachment is a required field");
    }
  }

  async execute() {
    try {
      this.validate();
      const {
        name,
        email,
        webAddress,
        coverLetter,
        attachment,
        fondOfWorking = false,
      } = this.request.body;
      const ip: any =
        this.request.headers["x-forwarded-for"] ||
        this.request.connection.remoteAddress;
      console.log(ip.split(":")[3]);

      const location: any = lookup("13.234.72.187");

      const candidate = new Candidate(
        name,
        email,
        webAddress,
        coverLetter,
        attachment,
        fondOfWorking,
        ip,
        new Location(location.country, location.city, location.region)
      );
      await this.candidateRepository.addNewCandidate(candidate);
      this.response.send({ code: 200, message: "success", data: null });
    } catch (error) {
      this.response.send(error);
    }
  }

  static create(request: Request, response: Response) {
    let useCase = new AddCandidateUseCase(
      request,
      response,
      new CandidateRepository()
    );
    return useCase;
  }
}
