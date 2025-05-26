import express from 'express';
import {
  delete_company,
  get_all_company,
  get_company_by_id,
  register_company,
  update_company,
} from '../controllers/company.controller';
import { authenticate } from '../middleware/authenticated';
import { authorizeRoles } from '../middleware/authorize-roles';
import { ROLE } from '../constants';

const router = express.Router();

router.post('/register', register_company);

router.delete('/:id', authenticate, authorizeRoles(ROLE.Owner), delete_company);

router.patch('/:id', authenticate, authorizeRoles(ROLE.Owner), update_company);

router.get('/', authenticate, get_all_company);

router.get('/:id', authenticate, get_company_by_id);

export default router;
