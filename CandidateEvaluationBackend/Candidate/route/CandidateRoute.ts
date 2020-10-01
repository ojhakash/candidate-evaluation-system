import express from "express";
import AddCandidateUseCase from '../usecases/AddCandidateUsecase';
import GetCandidatesUsecase from '../usecases/GetCandidatesUsecase';
import GetCandidateByIdUsecase from '../usecases/GetCandidateByIdUsecase';
import AddCommentUsecase from '../usecases/AddCommentUseCase';
import RateCandidateUsecase from '../usecases/RateCandidateUsecase';

const router = express.Router();

router.post("/candidate/add", async (request, response) => {
  try {
    let usecase = await AddCandidateUseCase.create(request, response);
    await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

router.get("/candidate/all", async (request, response) => {
  try {
    let usecase = await GetCandidatesUsecase.create(request, response);
    await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

router.get("/candidate/:candidateId", async (request, response) => {
  try {
    let usecase = await GetCandidateByIdUsecase.create(request, response);
    console.log(request.params);
    
    await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

router.post("/candidate/comment/add", async (request, response) => {
  try {
    let usecase = AddCommentUsecase.create(request, response);
    await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

router.post("/candidate/rating/add", async (request, response) => {
  try {
    let usecase = await RateCandidateUsecase.create(request, response);
    usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

export default router;
