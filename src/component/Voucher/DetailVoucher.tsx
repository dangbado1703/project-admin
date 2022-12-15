import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { changeAction, createVoucher, getDetail, getProduct, updateVoucher } from "../../pages/Voucher/voucher.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { path } from "../../router/path";
import dayjs from 'dayjs'
import {
  DATE_FORMAT_TYPE_DDMMYYYY,
  DATE_FORMAT_TYPE_YYYYMMDD,
} from "../../utils/contants";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import SelectCommon from "../../utils/SelectCommon";
import { filterSelectOption, STATUS, TYPEDISCOUNT, TYPEVOCHER } from "../../utils/filterOptions";

const DetailVoucher = () => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { action, dataDetail,dataProduct } = useAppSelector(
    (state) => state.voucherReducer
  );
  console.log("dataDetail =",dataDetail);
  console.log("dataProduct =",dataProduct);
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname.includes("detail")) {
      dispatch(changeAction("view"));
    }
    if (pathname.includes("update")) {
      dispatch(changeAction("update"));
    }
    if (pathname.includes("create")) {
      dispatch(changeAction("addnew"));
    }
    dispatch(getProduct())
  }, [pathname, dispatch]);
  
  useEffect(() => {
    if (!id) return;
    dispatch(getDetail(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const resPayload: any = res.payload;
        console.log('resPayload',resPayload)
        form.setFieldsValue({
          ...resPayload.data.data,
          expiredDate: resPayload.data.data.expiredDate
            ? dayjs(resPayload.data.data.expiredDate)
            : null,
        });
      }
    });
  }, [id, dispatch, form]);
  const handleSubmit = (data: any) => {
    if (action === 'update') {
      dispatch(updateVoucher({
        ...data,
        voucherId: id})
        ).then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Sửa khuyến mãi thành công");
            navigate(path.voucher);
          }
        })
      return
    }
    dispatch(createVoucher({...data})).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Thêm khuyến mãi thành công");
        navigate(path.voucher);
      }
    });
    console.log("data", data);
  };
  // const validateDay = (_: any, value: any) => {
  //   const toDay = new Date().getTime();
  //   const getTime = new Date(value).getTime();
  //   if (!value) {
  //     return Promise.resolve();
  //   }
  //   if (getTime > toDay) {
  //     return Promise.reject("Ngày sinh nhật không thể lớn hơn ngày hiện tại");
  //   }
  //   return Promise.resolve();
  // };
  const handleCancelUpdate = () => {
    navigate(path.voucher);
  }
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
              name="typeVoucher"
              label="Loại khuyến mãi"
              // rules={[
              //   {
              //     required: action === "update",
              //   },
              // ]}
            >
              <SelectCommon
              options={TYPEVOCHER}
              filterOption={filterSelectOption}
              placeholder="Loại giảm giá"
              disabled={action === "view"}
            />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="type"
              label="Loại giảm giá"
              // rules={[
              //   {
              //     required: action === "update",
              //   },
              // ]}
            >
              <SelectCommon
              options={TYPEDISCOUNT}
              filterOption={filterSelectOption}
              placeholder="Loại giảm giá"
              disabled={action === "view"&&form.getFieldValue("typeVoucher")!==1}
            />
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
              name="expiredDate"
              label="Ngày hiệu lực"
              rules={[
                { required: true },
                // {
                //   validator: validateDay,
                // },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Ngày hiệu lực"
                className="date-picker"
                disabled={action === "view"}
              />
            </Form.Item>
            {/* <Form.Item
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
            </Form.Item> */}
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
              <SelectCommon
              options={STATUS}
              filterOption={filterSelectOption}
              placeholder="Trạng thái"
              disabled={action === "view"}
            />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="id"
              label="Sản phẩm áp dụng"
              // rules={[
              //   {
              //     required: action === "update",
              //   },
              // ]}
            >
              <SelectCommon
              options={dataProduct}
              placeholder="Sản phẩm áp dụng"
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
          {action !== "view" && (
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Form.Item>
                <Button className="search" htmlType="submit">
                  Save
                </Button>
                <Button className="delete" onClick={handleCancelUpdate}>Cancel</Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default DetailVoucher;
