import { Router } from "express";
import { notFoundPage } from "../controller/pageController.js";

const router = Router();

router.use("/", notFoundPage);

export default router;
