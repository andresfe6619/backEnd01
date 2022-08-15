
import  {Router} from "express";
const router = new Router();
import { newUser, result, destroyUser, checkCookie} from "../Controllers/cookies.js";

router.get("/inicio", newUser).post("/inicio", result)

router.get ("/adios",checkCookie, destroyUser)
















export default  router;
