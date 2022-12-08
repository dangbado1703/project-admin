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
  status: number;
}

export interface IFormSearchOrder {
  customerId: number | null;
  status: number | null;
  fromPrice: number | string;
  toPrice: number | string;
  fromDate: string | null;
  toDate: string | null;
  page?: number;
  size?: number;
}
export interface IFormColumnsOrder extends IFormDataOrder {
  stt: number;
}

export interface IFormDetailOrder {
  addressDTO: {
    districtName: string;
    provinceName: string;
    wardName: string;
  };
  customerDTO: {
    address: string;
    allowReceiveExcel: string;
    allowReceivePdf: string;
    avatar: string;
    birthday: string;
    createdBy: string;
    createdDate: "2022-11-14T00:01:08";
    customerId: string;
    deptId: string;
    deptName: string;
    email: string;
    employeeCode: string;
    fullName: string;
    gender: string;
    idNumber: string;
    ipAddress: string;
    isViettel: string;
    issueBy: string;
    issueDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    passwordRaw: string;
    phone: string;
    roles: any[];
    status: string;
    username: string;
  };
  order: {
    deliveryDate: string;
    description: string;
    grandTotal: number;
    id: number;
    isDeleted: boolean;
    isPayment: boolean;
    orderDate: string;
    paymentId: number;
    paymentMethod: string;
    shipmentId: number;
    shippingMethod: string;
    shippingTotal: number;
    status: number;
    subTotal: number;
    taxRate: number;
    taxTotal: number;
  };
  payment: {
    paymentId: number;
    paymentMethod: string;
  };
  productDTOS: any;
  shipment: {
    shipmentId: number;
    shippingMethod: string;
  };
}
