import { Form } from "antd";
import React from "react";
import { REGEX_NAME } from "./regex";

interface IFormProps {
  children?: JSX.Element;
  name?: string;
  label?: string;
  min?: number;
  max?: number;
  isRequired?: boolean;
  validate?: (_: any, value: string) => Promise<void>;
  isEmail?: boolean;
  isName?: boolean;
  isDate?: boolean;
}
const CommonFormItem = ({
  children,
  name,
  label,
  min,
  max,
  isRequired = true,
  validate,
  isEmail = false,
  isName = false,
  isDate = false,
  ...rest
}: IFormProps) => {
  return (
    <Form.Item
      {...rest}
      name={name}
      label={label}
      rules={[
        { required: isRequired },
        {
          validator: validate,
        },
        max
          ? {
              max,
              message: `Tối đa ${max} ký tự`,
            }
          : "",
        min
          ? {
              min,
              message: `Tối thiểu ${min} ký tự`,
            }
          : "",
        isEmail
          ? {
              type: "email",
              message: "Vui lòng nhập đúng định dạng email",
            }
          : ("" as any),
        isName
          ? {
              pattern: new RegExp(REGEX_NAME),
              message: "Vui lòng bỏ ký tự đặc biệt",
            }
          : "",
      ]}
    >
      {children}
    </Form.Item>
  );
};

export default CommonFormItem;
