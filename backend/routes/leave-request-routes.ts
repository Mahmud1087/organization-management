import express from 'express';
import { authenticate } from '../middleware/authenticated';
import {
  approve_reject_request,
  create_request,
  delete_request,
  get_all_request,
  get_request_by_dept,
  get_request_by_id,
  get_request_by_orgId,
  get_request_by_staff_id,
} from '../controllers/leave-request.controller';
import { authorizeRoles } from '../middleware/authorize-roles';
import { ROLE } from '../constants';

const router = express.Router();

router.post('/create', authenticate, create_request);

router.patch(
  '/:id',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin, ROLE.Manager),
  approve_reject_request
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles(ROLE.Owner, ROLE.Admin, ROLE.Manager),
  delete_request
);

router.get('/', authenticate, get_all_request);

router.get('/:id', authenticate, get_request_by_id);

router.get('/org/:orgId', authenticate, get_request_by_orgId);

router.get('/dept/:departmentId', authenticate, get_request_by_dept);

router.get('/staff/:staffId', authenticate, get_request_by_staff_id);

export default router;
