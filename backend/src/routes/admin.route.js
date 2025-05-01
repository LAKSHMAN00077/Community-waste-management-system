import express from "express";
import { isAdmin, protectedRoute } from "../middlewares/auth.middleware.js";
import { handleAdminDeleteReport, handleAdminDeleteUser, handleAdminGetAllUsers, handleAdminResetPassword, handleAdminUpdateReportStatus, handleGetAllReports, handleGetReportSummary } from "../controllers/admin.controller.js";

const router = express.Router();

router.get('/reports', protectedRoute, isAdmin, handleGetAllReports);
router.put('/reports/:id', protectedRoute, isAdmin, handleAdminUpdateReportStatus);
router.delete('/reports/:id', protectedRoute, isAdmin, handleAdminDeleteReport);
router.get('/reports-summary', protectedRoute, isAdmin, handleGetReportSummary);

router.get('/users', protectedRoute, isAdmin, handleAdminGetAllUsers);


router.delete('/users/:id', protectedRoute, isAdmin, handleAdminDeleteUser);

router.put('/users/:id/reset-password', protectedRoute, isAdmin, handleAdminResetPassword)

export default router;