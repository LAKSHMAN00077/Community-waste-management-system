import express from "express";
import { handleDeleteUserAccount, handleGetUserProfile, handleUpdateUserPassword, handleUpdateUserProfile } from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/profile',protectedRoute, handleGetUserProfile);
router.put('/profile', protectedRoute, handleUpdateUserProfile);

router.put('/update-password', protectedRoute, handleUpdateUserPassword)

router.delete('/delete-account', protectedRoute, handleDeleteUserAccount)

export default router;