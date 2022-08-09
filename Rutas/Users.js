
import  {Router} from "express";
const router = new Router();
import { newUser, result, destroyUser } from "./controllers/cookies.js";

router.get("/inicio", newUser).post("/inicio", result)

router.get ("/adios",  destroyUser )
















export default  router;
