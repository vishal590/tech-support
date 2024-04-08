import express from "express";
import {getTechSupportUsersController, loginController, registerController} from '../controllers/userController.js'

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/tech-support', getTechSupportUsersController);


export default router;