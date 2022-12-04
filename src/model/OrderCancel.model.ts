export interface IFormDataOrderCancel {
  userId: number;
  customerId: number;
  type: number;
  customerName: string;
  reason: string;
  employee: string;
  productName: string;
}

export interface IFormSearchOrderCancel {
  customerName:String;
  page?: number;
  size?: number;
}
export interface IFormColumnsOrderCancel extends IFormDataOrderCancel {
  stt: number;
}
