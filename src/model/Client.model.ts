export interface IFormDataClient {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: number;
  createdBy: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IFormSearchClient {
  username?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: number | null;
  birthday?: string | null;
  page: number;
  size: number;
}

export interface IFormColumns extends IFormDataClient {
  stt: number;
}

export interface IFormUpdate {
  userId: number;
  username: string;
  fullName: string;
  birthday: string;
  email: string;
  phone: string;
  password: string;
}
