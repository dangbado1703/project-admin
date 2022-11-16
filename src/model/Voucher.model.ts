export interface IFormSearchVoucher {
  code: string;
  // fromPrice: string;
  status: string;
  // toPrice: string;
}

export interface IFormDataVoucher {
  voucherId: number;
  code: string | null;
  description: string | null;
  productApply: string | null;
  expiredDate: string | null;
  status: number | null;
  discountPrice: number;
}

export interface IFormUpdate {
  voucherId: number;
  description: string;
  effectDay: number;
  status: number;
  discountPrice: number;
  code: string;
  productId: [String];
}

export interface IFormColumnsVoucher extends IFormDataVoucher {
  stt: number;
}

export interface IFormSearch extends IFormSearchVoucher {
  page: number;
  size: number;
}