import { Router } from "express";
import { result } from "../controller/carbonController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post("/calculate", validateRequest(), result);

export default router;
