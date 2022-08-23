import  {Router} from "express";
const router = new Router();
import desafio from "../Controllers/desafio.js"

router.get("/process", desafio)

export default router;