import { Router } from "express";
import authController from "../../controllers/authController.js";

const router = Router();

//POST
router.post('/auth/register', authController.postRegister);
router.post('/auth/login', authController.postLogin);

//GET
router.get('/auth/register', authController.getRegister);
router.get('/auth/login', authController.getLogin);

export default router;