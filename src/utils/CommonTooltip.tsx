import { Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "./contants";

const CommonTooltip = ({ value }: { value: string }) => {
  if (
    moment(value).format(DATE_FORMAT_TYPE_DDMMYYYY) === "Invalid date" ||
    Number(value)
  ) {
    return <Tooltip title={value}>{value}</Tooltip>;
  }
  return (
    <Tooltip title={moment(value).format(DATE_FORMAT_TYPE_DDMMYYYY)}>
      {moment(value).format(DATE_FORMAT_TYPE_DDMMYYYY)}
    </Tooltip>
  );
};

export default CommonTooltip;
