export interface IFormDataDanhMuc {
  id: number;
  name: string;
  code: string;
  parentName: string;
  createdBy: string;
  description: string;
  status:number;
  lastModifiedDate: string;
  parentId:number;
}

export interface IFormSearchDanhMuc {
  name: string;
  code: string;
  status?: number;
  createdBy:String;
  parentId?: number;
  page?: number;
  size?: number;
}

export interface IFormColumnsDanhMuc extends IFormDataDanhMuc {
  stt: number;
}
