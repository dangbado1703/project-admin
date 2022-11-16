import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { changeAction, getDetail } from "../../pages/Product/product.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  DATE_FORMAT_TYPE_DDMMYYYY,
  DATE_FORMAT_TYPE_YYYYMMDD,
} from "../../utils/contants";
import moment from "moment";

const DetailProduct = () => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { action, dataDetail } = useAppSelector(
    (state) => state.productReducer
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
              name="name"
              label="Product Name"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Product name"
                onBlur={(e) =>
                  form.setFieldValue("name", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="code"
              label="Product Code"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Product Code"
                onBlur={(e) =>
                  form.setFieldValue("code", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="weight"
              label="Weight"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Weight"
                onBlur={(e) =>
                  form.setFieldValue("weight", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="expiredDate"
              label="Expired Date"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                className="date-picker"
                disabled={action === "view"}
                placeholder="Expired Date"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Price"
                onBlur={(e) =>
                  form.setFieldValue("price", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="stockQty"
              label="Stock Quantity"
              rules={[
                {
                  required: action === "update",
                },
              ]}
            >
              <Input
                placeholder="Stock Quantity"
                onBlur={(e) =>
                  form.setFieldValue("stockQty", e.target.value.trim())
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

export default DetailProduct;
