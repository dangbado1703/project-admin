import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../router/path";
import { useAppDispatch } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { register } from "./Register.reducer";

const Register = () => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const password = Form.useWatch("password", form);
  const enterPassword = Form.useWatch("repassword", form);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (data: any) => {
    if (data.save) {
      localStorage.setItem(
        "account",
        JSON.stringify({
          username: data.username,
          password: data.password,
        })
      );
    }
    dispatch(
      register({
        username: data.username,
        password: data.password,
        phone: data.phone,
        fullName: data.fullName,
        email: data.email,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate(path.login);
        toast.success("Đăng ký thành công");
      }
      if (res.meta.requestStatus === "rejected") {
        console.log("res", res);
      }
    });
  };
  const validatePassword = (_: any, value: string) => {
    if (!password) {
      return Promise.resolve();
    }
    if (!value) {
      return Promise.resolve();
    }
    if (value === password) {
      return Promise.resolve();
    } else {
      return Promise.reject("Nhập lại mật khẩu không đúng");
    }
  };
  const handleChangeValues = (values: any) => {
    if (values.password === enterPassword) {
      form.setFields([
        {
          name: "repassword",
          errors: [],
        },
      ]);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="login-form"
    >
      <div style={{ width: "700px" }}>
        <Form
          form={form}
          onFinish={handleSubmit}
          onValuesChange={handleChangeValues}
          layout="vertical"
          validateMessages={validateMessages}
          requiredMark={false}
        >
          <Row>
            <Col span={24}>
              <CommonFormItem
                label="Username"
                name="username"
                isRequired
                max={12}
                min={4}
              >
                <Input
                  placeholder="Username"
                  onBlur={(e) =>
                    form.setFieldValue("username", e.target.value.trim())
                  }
                  style={{ height: "40px", fontSize: "16px" }}
                />
              </CommonFormItem>
            </Col>
            <Col span={24}>
              <CommonFormItem name="password" label="Password" max={12} min={4}>
                <Input
                  type="password"
                  placeholder="Password"
                  style={{ height: "40px", fontSize: "16px" }}
                />
              </CommonFormItem>
            </Col>
            <Col span={24}>
              <CommonFormItem
                label="Nhập lại password"
                name="repassword"
                max={12}
                min={4}
                validate={validatePassword}
              >
                <Input
                  type="password"
                  placeholder="Nhập lại password"
                  style={{ height: "40px", fontSize: "16px" }}
                />
              </CommonFormItem>
            </Col>
            <Col span={24}>
              <CommonFormItem name="fullName" label="Tên" isName={true}>
                <Input
                  placeholder="Full name"
                  style={{ height: "40px", fontSize: "16px" }}
                  onBlur={(e) =>
                    form.setFieldValue("fullName", e.target.value.trim())
                  }
                />
              </CommonFormItem>
            </Col>
            <Col span={24}>
              <CommonFormItem
                name="phone"
                label="Số điện thoại"
                max={12}
                min={9}
              >
                <Input
                  placeholder="Số điện thoại"
                  style={{ height: "40px", fontSize: "16px" }}
                  type="number"
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
                  style={{ height: "40px", fontSize: "16px" }}
                  onBlur={(e) =>
                    form.setFieldValue("email", e.target.value.trim())
                  }
                />
              </CommonFormItem>
            </Col>
            <Col span={24}>
              <Form.Item valuePropName="checked" name="save">
                <Checkbox>Lưu tài khoản</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40px", fontSize: "16px" }}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Register;
