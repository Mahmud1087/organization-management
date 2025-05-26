import { ROLES } from '@/config/constants';
import type {
  GenericAuthDataReturnType,
  OwnerAdminAuthDataReturnType,
} from '@/types';

export function isOwnerOrAdmin(
  data: GenericAuthDataReturnType
): data is OwnerAdminAuthDataReturnType {
  return data?.role === ROLES.Owner || data?.role === ROLES.Admin;
}
