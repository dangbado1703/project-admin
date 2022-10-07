export interface IFormSearchProduct {
  name: string;
  code: string;
  productTypeId: string;
  makeId: string;
  fromPrice: string;
  status: string;
  toPrice: string;
  createdBy: string;
  expiredDate: string;
  fromDate: string;
  toDate: string;
  fromStockQty: string;
  toStockQty: string;
}

export interface IFormColumnsProduct extends IFormDataProduct {
  stt: number;
}

export interface IFormSearch extends IFormSearchProduct {
  page: number;
  size: number;
}

export interface IFormDataProduct {
  productId: number;
  makeName: string;
  name: string;
  code: string;
  description: string | null;
  weight: string | null;
  expiredDate: string | null;
  price: number;
  productType: string;
  createdBy: string;
  createdDate: string;
  lastModifiedDate: string;
  status: number | null;
  stockQty: number;
}

export interface IFormUpdate {
  id: number;
  makeId: number;
  name: string;
  code: string;
  quantity: number;
  price: number;
  productTypeId: number;
  stockQty: number;
  weight: number;
  expiredDate: string;
}
