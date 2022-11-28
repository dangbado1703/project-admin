import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import React, { useEffect } from "react";
import { IFormColumnsDanhMuc, IFormSearchDanhMuc } from "../../model/DanhMuc.model";
import { IFormColumnsStaff, IFormSearchStaff } from "../../model/Staff.model";
import { IFormPropsModal } from "../../model/utils";
import { createDanhMuc, getDanhMuc, updateDanhMuc } from "../../pages/DanhMuc/danhmuc.reducer";
import { getUser, updateUser } from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import {
  DATE_FORMAT_TYPE_DDMMYYYY,
  DATE_FORMAT_TYPE_YYYYMMDD,
} from "../../utils/contants";
import { STATUS } from "../../utils/filterOptions";
import SelectCommon from "../../utils/SelectCommon";

const ViewModal = ({
  isOpen,
  setIsOpen,
  valueDetail,
  valueSearch,
}: IFormPropsModal<IFormColumnsDanhMuc, IFormSearchDanhMuc>) => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const { action, dataParent } = useAppSelector((state) => state.danhMucReducer);
  const setTitle = () => {
    if (action === "view") {
      return "Xem chi tiết";
    }
    if (action === "update") {
      return "Cập nhật danh mục";
    }
  };
  const handleSubmit = (data: any) => {
    if (action === 'addnew') {
      dispatch(createDanhMuc(data)).then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setIsOpen(false);
          dispatch(getDanhMuc(valueSearch));
        }
      })
      return
    }
    dispatch(updateDanhMuc({ ...data, userId: valueDetail?.id })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsOpen(false);
          dispatch(getDanhMuc(valueSearch));
        }
      }
    );
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
          {action !== "view" ? (
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
            <CommonFormItem label="Tên danh mục" name="name" min={4}>
              <Input
                placeholder="Tên danh mục"
                onBlur={(e) =>
                  form.setFieldValue("name", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </CommonFormItem>
          </Col>
          <Col span={24}>
            <CommonFormItem label="Mã danh mục" name="code" isName={true}>
              <Input
                placeholder="Mã danh mục"
                onBlur={(e) =>
                  form.setFieldValue("code", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </CommonFormItem>
          </Col>
          <Col span={24}>
            {action !== 'addnew' ? <Col span={24}>
              <Form.Item name='status' label='Trạng thái'>
                <SelectCommon placeholder='Trạng thái' options={STATUS} disabled={action === 'view'} />
              </Form.Item>
            </Col> : null}
            <Col>
              <Form.Item name='parentId' label='Danh mục cha'>
                <SelectCommon placeholder="Danh mục cha" options={dataParent} disabled={action === 'view'} />
              </Form.Item>
            </Col>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ViewModal;
