import { Tooltip } from "antd";
import React from "react";

const CommonTooltip = ({ value }: { value: string }) => {
  return <Tooltip title={value}>{value}</Tooltip>;
};

export default CommonTooltip;
