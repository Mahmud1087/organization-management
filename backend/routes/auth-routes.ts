import express from 'express';
import {
  forgot_password,
  login,
  logout,
  register,
  register_admin,
  reset_password,
  verify_email,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/authenticated';
import { authorizeRoles } from '../middleware/authorize-roles';
import { ROLE } from '../constants';

const router = express.Router();

router.post('/register', register);
router.post(
  '/admin/register',
  authenticate,
  authorizeRoles(ROLE.Owner),
  register_admin
);

router.post('/login', login);

router.post('/forgot-password', forgot_password);

router.post('/reset-password/:token', reset_password);

router.post('/verify-email', verify_email);

router.post('/logout', logout);

export default router;
