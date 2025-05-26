import express from 'express';
import {
  create_staff,
  login_staff,
  delete_staff,
  update_staff,
  get_all_staff,
  get_staff_by_id,
  get_staff_by_orgId,
  get_staff_by_dept,
} from '../controllers/staff.controller';
import { authenticate } from '../middleware/authenticated';
import { authorizeRoles } from '../middleware/authorize-roles';
import { ROLE } from '../constants';

const router = express.Router();

router.post(
  '/register',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin),
  create_staff
);

router.post('/login', login_staff);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin),
  delete_staff
);

router.patch(
  '/update/:id',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin),
  update_staff
);

router.get('/', authenticate, get_all_staff);

router.get('/:id', authenticate, get_staff_by_id);

router.get('/org/:orgId', authenticate, get_staff_by_orgId);

router.get('/dept/:departmentId', authenticate, get_staff_by_dept);
export default router;
