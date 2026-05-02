import { Router } from "express";
import {
  mainPage,
  calculatorPage,
  notFoundPage,
} from "../controller/pageController.js";

const router = Router();

router.use("/ui", notFoundPage);
router.get("/", mainPage);
router.get("/calculator", calculatorPage);
router.use(notFoundPage);

export default router;
