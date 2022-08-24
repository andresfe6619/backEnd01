import  {Router} from "express";
const router = new Router();
import {desafio, numbers} from "../Controllers/desafio.js"

router.get("/process", desafio)
router.get("/randoms", numbers )
export default router;