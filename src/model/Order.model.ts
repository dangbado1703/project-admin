export interface IFormDataOrder {
  oderId: number;
  customerName: string;
  statusConfirm: number;
  statusOrder: number;
  price: number;
  orderDate: string;
  description: string;
  deliveryDate: string;
  shippingTotal: number;
  paymentMethod: string;
  shippingMethod: string;
  isPayment: number;
}

export interface IFormSearchOrder {
  customerId: number | null;
  status: number | null;
  fromPrice: number | string;
  toPrice: number | string;
  fromDate: string | null;
  toDate: string | null;
  page?:number,
  size?:number
}
export interface IFormColumnsOrder extends IFormDataOrder {
  stt: number;
}
