import express from 'express';
import { isAdmin, protectedRoute } from '../middlewares/auth.middleware.js';
import { handleDeleteReport, handleGetAllReports, handleUpdateReport, handleUserCreateReport, handleUserGetReport } from '../controllers/report.controller.js';


const router = express.Router();

router.post('/',protectedRoute, handleUserCreateReport);
router.get('/',protectedRoute, handleUserGetReport);
router.put('/:id',protectedRoute, handleUpdateReport);
router.delete('/:id',protectedRoute,handleDeleteReport);
router.get('/all',protectedRoute,handleGetAllReports)

router.patch('/status/:id', protectedRoute, isAdmin, handleUpdateReport)

export default router;