export const DATE_FORMAT_TYPE_DDMMYYYY = "DD/MM/YYYY";
export const DATE_FORMAT_TYPE_YYYYMMDD = "YYYY-MM-DD";
export const STATUS_ORDER = [
  { value: 0, label: "Đang Chờ" },
  { value: 1, label: "Chấp nhận" },
];
export const CONVERT_MONEY = (number: number) => {
  const money = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(number);
  return money;
};
