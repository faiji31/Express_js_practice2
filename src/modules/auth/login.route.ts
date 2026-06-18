import { Router } from "express";
import { authController } from "./login.controller.js";


const router = Router()

router.post("/login",authController.loginUser)

export const authroute = router





