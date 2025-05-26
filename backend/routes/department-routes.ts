import express from 'express';
import {
  create_departement,
  delete_department,
  get_all_department,
  get_department_by_id,
  get_department_by_orgId,
  update_department,
} from '../controllers/department.controller';
import { authenticate } from '../middleware/authenticated';
import { authorizeRoles } from '../middleware/authorize-roles';
import { ROLE } from '../constants';

const router = express.Router();

router.post(
  '/create',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin),
  create_departement
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin),
  delete_department
);

router.patch(
  '/update/:id',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin),
  update_department
);

router.get('/', authenticate, get_all_department);

router.get('/:id', authenticate, get_department_by_id);

router.get('/org/:orgId', authenticate, get_department_by_orgId);

export default router;
