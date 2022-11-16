import { Key } from "antd/lib/table/interface";

export interface IFormProps<T> {
  page: number;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  selectedRowKeys: Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
  valueSearch: T;
  setValueSearch: React.Dispatch<React.SetStateAction<T>>;
}

export interface IFormPropsModal<T, U> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  valueDetail?: T;
  valueSearch: U;
}
