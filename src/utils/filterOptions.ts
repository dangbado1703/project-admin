import { Layout } from 'antd';
export const filterSelectOption = (input: any, option: any) => {
  return (
    option.label?.toLowerCase().includes(input) || option.label?.includes(input)
  );
};

export const STATUS = [
  {
    value: 1,
    label: "Hoạt động",
  },
  {
    value: 0,
    label: "Không hoạt động",
  },
];

export const TYPEVOUCHER = [
  {
    value: 1,
    label: "Khuyến mãi giảm giá sản phẩm",
  },
  {
    value: 2,
    label: "Miễn phí giao hàng",
  },
  {
    value: 3,
    label: "Khác",
  },
];


export const TYPE=[
  {
    value: 1,
    label: "Giảm theo phần trăm sản phẩm"
  },
  {
    value: 2,
    label: "Giảm theo giá"
  }
]