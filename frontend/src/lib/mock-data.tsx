import { ROLES } from '@/config/constants';
import {
  DASHBOARD,
  DEPARTMENT_PAGE,
  LEAVE_REQUEST_PAGE,
  SETTINGS_PAGE,
  STAFF_PAGE,
} from '@/config/page-routes';
import { Building2, FileStack, Layers2, Settings2, Users2 } from 'lucide-react';

export const sideNavLists = [
  {
    id: 1,
    name: 'Overview',
    icon: <Layers2 className='size-5 md:size-6' />,
    href: DASHBOARD,
    canView: [ROLES.Owner, ROLES.Admin, ROLES.Employee, ROLES.Manager],
  },
  // {
  //     id: 2,
  //     name: 'Admins',
  //     icon: <Layers2/>,
  //     href:DASHBOARD,
  //     canView:[ROLES.Owner]
  // },
  {
    id: 2,
    name: 'Staffs',
    icon: <Users2 className='size-5 md:size-6' />,
    href: STAFF_PAGE,
    canView: [ROLES.Owner, ROLES.Admin, ROLES.Manager],
  },
  {
    id: 3,
    name: 'Departments',
    icon: <Building2 className='size-5 md:size-6' />,
    href: DEPARTMENT_PAGE,
    canView: [ROLES.Owner, ROLES.Admin],
  },
  {
    id: 1,
    name: 'Requests',
    icon: <FileStack className='size-5 md:size-6' />,
    href: LEAVE_REQUEST_PAGE,
    canView: [ROLES.Owner, ROLES.Admin, ROLES.Manager, ROLES.Employee],
  },
  {
    id: 1,
    name: 'Settings',
    icon: <Settings2 className='size-5 md:size-6' />,
    href: SETTINGS_PAGE,
    canView: [ROLES.Owner, ROLES.Admin, ROLES.Manager, ROLES.Employee],
  },
];
