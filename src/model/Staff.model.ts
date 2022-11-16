export interface IFormDataStaff {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: number;
  createdBy: string;
  createdDate: string;
  birthday: string;
  lastModifiedDate: string;
}

export interface IFormSearchStaff {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: number;
  page?: number;
  size?: number;
  gender: string | null;
  roleId: string | null;
}

export interface IFormColumnsStaff extends IFormDataStaff {
  stt: number;
}
