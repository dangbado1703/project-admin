import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { IFormColumns, IFormSearchClient } from "../../model/Client.model";
import { getClient, updateClient } from "../../pages/Client/client.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";

interface IFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  valueDetail: IFormColumns | undefined;
  valueSearch: IFormSearchClient;
}
const ModalClient = ({
  isOpen,
  setIsOpen,
  valueDetail,
  valueSearch,
}: IFormProps) => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const action = useAppSelector((state) => state.clientReducer.action);
  const setTitle = () => {
    if (action === "view") {
      return "Xem chi tiết";
    }
    if (action === "update") {
      return "Cập nhật người dùng";
    }
  };
  const handleSubmit = (data: any) => {
    dispatch(
      updateClient({
        ...data,
        userId: valueDetail?.userId,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Cập nhật người dùng thành công");
        setIsOpen(false);
        dispatch(getClient(valueSearch));
      }
    });
  };
  useEffect(() => {
    if (valueDetail && isOpen)
      form.setFieldsValue({
        ...valueDetail,
        birthday: valueDetail?.birthday
          ? moment(valueDetail.birthday, "YYYY-MM-DD")
          : null,
      });
  }, [valueDetail, form, isOpen]);
  const validateDay = (_: any, value: any) => {
    const toDay = new Date().getTime();
    const getTime = new Date(value).getTime();
    if (!value) {
      return Promise.resolve();
    }
    if (getTime > toDay) {
      return Promise.reject("Ngày sinh nhật không thể lớn hơn ngày hiện tại");
    }
    return Promise.resolve();
  };
  return (
    <Modal
      open={isOpen}
      title={setTitle()}
      onCancel={() => setIsOpen(false)}
      afterClose={() => form.resetFields()}
      footer={
        <>
          <Button className="delete" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          {action === "update" ? (
            <Button className="search" onClick={() => form.submit()}>
              Đồng ý
            </Button>
          ) : null}
        </>
      }
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
        validateMessages={validateMessages}
      >
        <Row>
          <Col span={24}>
            <CommonFormItem
              label="Username"
              name="username"
              max={12}
              min={4}
              isRequired
            >
              <Input
                placeholder="Username"
                onBlur={(e) =>
                  form.setFieldValue("username", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </CommonFormItem>
          </Col>
          <Col span={24}>
            <CommonFormItem
              label="Full Name"
              name="fullName"
              isName={true}
              isRequired
            >
              <Input
                placeholder="Full name"
                onBlur={(e) =>
                  form.setFieldValue("fullName", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </CommonFormItem>
          </Col>
          <Col span={24}>
            <CommonFormItem
              name="phone"
              label="Phone"
              max={12}
              min={9}
              isRequired
            >
              <Input
                placeholder="Số điện thoại"
                type="number"
                disabled={action === "view"}
              />
            </CommonFormItem>
          </Col>
          <Col span={24}>
            <CommonFormItem
              isEmail={true}
              name="email"
              label="Email"
              isRequired
            >
              <Input
                placeholder="Nhập email của bạn"
                onBlur={(e) =>
                  form.setFieldValue("email", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </CommonFormItem>
          </Col>
          <Col span={24}>
            <Form.Item
              name="birthday"
              label="Sinh nhật"
              rules={[
                { required: true },
                {
                  validator: validateDay,
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Sinh nhật"
                className="date-picker"
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalClient;
