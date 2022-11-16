import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { changeAction, getDetail } from "../../pages/Voucher/voucher.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  DATE_FORMAT_TYPE_DDMMYYYY,
  DATE_FORMAT_TYPE_YYYYMMDD,
} from "../../utils/contants";
import moment from "moment";

const DetailVoucher = () => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { action, dataDetail } = useAppSelector(
    (state) => state.voucherReducer
  );
  useEffect(() => {
    if (pathname.includes("detail")) {
      dispatch(changeAction("view"));
    }
    if (pathname.includes("update")) {
      dispatch(changeAction("update"));
    }
  }, [pathname, dispatch]);
  useEffect(() => {
    if (!id) return;
    dispatch(getDetail(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const resPayload: any = res.payload;
        form.setFieldsValue({
          ...resPayload.data.data,
          expiredDate: resPayload.data.data.expiredDate
            ? moment(resPayload.data.data.expiredDate).format(
                DATE_FORMAT_TYPE_YYYYMMDD
              )
            : null,
        });
      }
    });
  }, [id, dispatch, form]);
  const handleSubmit = (data: any) => {
    console.log("data", data);
  };
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item
              name="code"
              label="Mã khuyến mãi"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Mã khuyến mại"
                onBlur={(e) =>
                  form.setFieldValue("code", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="expiredDate"
              label="Ngày hiệu lực"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Ngày hiệu lực"
                onBlur={(e) =>
                  form.setFieldValue("expiredDate", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="discountPrice"
              label="Giá giảm áp dụng"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Giá giảm áp dụng"
                onBlur={(e) =>
                  form.setFieldValue("discountPrice", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Trạng thái"
                onBlur={(e) =>{
                  form.getFieldValue("status")==1?
                  form.setFieldValue("status", "Hoạt động"):form.setFieldValue("status", "Không hoạt động")
                }
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <TextArea
                rows={4}
                maxLength={250}
                placeholder="Description"
                onBlur={(e) =>
                  form.setFieldValue("description", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          {action === "update" && (
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Form.Item>
                <Button className="search" htmlType="submit">
                  Save
                </Button>
                <Button className="delete">Cancel</Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default DetailVoucher;
