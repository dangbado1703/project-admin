export interface IFormDataOrder {
  order_id: number;
  delivery_date: string;
  description: string;
  order_date: string;
  order_status: string;
  payment_method: string;
  shipping_method: string;
  shipping_total: string;
  sub_total: number;
  tax_rate: number;
  customer_id: number;
  status: 0 | 1;
}

export interface IFormSearchOrder {
  customerId: number;
  statusOrder: number;
  fromPrice: number;
  toPrice: number;
  fromDate: string;
  toDate: string;
  hideCancel: string;
  page?: number;
  size?: number;
}
export interface IFormColumns extends IFormDataOrder {
  stt: number;
}
