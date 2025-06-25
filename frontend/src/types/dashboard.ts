export type Pagination = {
  total: number;
  limit: number;
  page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

export type OrganizationReturnType = {
  _id: string;
  officeEmail: string;
  officePhone: string;
  orgName: string;
  officeAddress: string;
  sector: string;
  createdAt: string;
  updatedAt: string;
};

export type StaffResultType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  departmentId: string;
  orgId: string;
  role: string;
  address: string;
  totalLeavesTaken: number;
  leaveBalance: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type DeptResultType = {
  _id: string;
  name: string;
  createdBy: string;
  orgId: string;
  noOfEmployee: number;
  totalStaff: number;
  noOfManagers: number;
  createdAt: string;
  updatedAt: string;
};

export type LeaveResultType = {
  _id: string;
  staffId: string;
  orgId: string;
  departmentId: string;
  status: string;
  startDate: string;
  endDate: string;
  reasonForLeave: string;
  reviewedBy: string;
  reasonForRejection: string;
};

export type StaffReturnType = {
  pagination: Pagination;
  result: StaffResultType[];
};

export type DeptReturnType = {
  pagination: Pagination;
  result: DeptResultType[];
};

export type LeaveReturnType = {
  pagination: Pagination;
  result: LeaveResultType[];
};
