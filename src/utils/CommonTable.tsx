import { Empty, Table, TableProps, Tag } from "antd";
import React from "react";
import CommonTooltip from "./CommonTooltip";

interface IFormProps extends TableProps<any> {
  total: number;
  page: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
} // Định nghĩa các props sẽ truyền vào
const CommonTable = ({
  total,
  page,
  pageSize,
  setPage,
  setSize,
  columns,
  ...rest
}: // đây là những props
IFormProps) => {
  const newColumns = columns?.map((item) => {
    if (item.title === "Status") {
      return {
        ...item,
        render(value: any) {
          if (value === 1) {
            return <Tag color="success">Hoạt động</Tag>;
          }
          if (value === 0) {
            return <Tag color="warning">Không hoạt động</Tag>;
          }
        },
      };
    }
    if (
      item.title !== "STT" &&
      item.title !== "Hành động" &&
      item.title !== "Status"
    ) {
      return {
        ...item,
        render(value: any) {
          return <CommonTooltip value={value} />;
        },
      };
    }
    return item;
  });
  newColumns?.unshift({
    title: "STT",
    dataIndex: "stt",
    width: 45,
    align: "center",
    render(value, record, index) {
      return page === 1 ? index + 1 : (page - 1) * page + index + 1;
    },
  });
  return (
    <Table
      {...rest}
      size="small"
      bordered
      columns={newColumns}
      pagination={{
        total,
        showTotal: (total, range) =>
          `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
        onChange: (page) => setPage(page),
        onShowSizeChange: (_, pageSize) => setSize(pageSize),
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize,
        current: page,
        locale: {
          jump_to: "Đến trang",
          page: "",
          items_per_page: "/ Trang",
        },
      }}
      locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
    />
  );
};

export default CommonTable;
