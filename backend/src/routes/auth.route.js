import express from "express";
import {handleUserSignup, handleUserLogin, handleUserLogout, handleUserCheckAuth} from "../controllers/auth.controller.js"
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/logout",handleUserLogout);

router.get("/check",protectedRoute,handleUserCheckAuth);


export default router;