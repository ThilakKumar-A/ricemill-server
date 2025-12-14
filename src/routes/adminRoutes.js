import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
  createAdmin,
  getAdmins,
  deleteAdmin,
  toggleAdminStatus,
  authAdmin,
  getAdminProfile
} from '../controllers/adminController.js';

// Public routes
router.post('/login', authAdmin);

// Protected routes
router.get('/profile', protect, getAdminProfile);
router.route('/')
  .post(createAdmin)
  .get(getAdmins);
router.route('/:id')
  .delete(deleteAdmin);
router.route('/:id/active')
  .put(toggleAdminStatus);

export default router;
