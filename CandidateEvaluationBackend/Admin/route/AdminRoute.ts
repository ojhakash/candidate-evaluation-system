import express from "express";
import RegisterAdminUsecase from "../usecase/RegisterAdminUsecase";
import SigninAdminUsecase from "../usecase/SigininAdminUsecase";
import UserCallbackVerifyUsecase from '../usecase/UserCallbackVerifyUsecase';

const router = express.Router();

router.post("/admin/register", async (request, response) => {
  try {
    let usecase = await RegisterAdminUsecase.create(
      request,
      response
    );
    return await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

router.post("/admin/signin", async (request, response) => {
  try {
    let usecase = await SigninAdminUsecase.create(
      request,
      response
    );
    await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

router.get("/admin/callback/:callbackToken", async (request, response) => {
  try {
    let usecase = await UserCallbackVerifyUsecase.create(
      request,
      response
    );
    await usecase.execute();
  } catch (error) {
    response.send(error);
  }
});

export default router;
