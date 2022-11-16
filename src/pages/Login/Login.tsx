import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoginAPI } from "./login.reducer";
import "./Login.scss";

const Login = () => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.loginReducer.isLoading);
  const handleSubmit = (data: any) => {
    if (data.save) {
      // check người dùng có click vào save tài khoản hoặc mật khẩu không? nếu có thì lưu vào localStorage để lần sau khi vào lại trang sẽ tự động fill dữ liệu đã lưu vào trong input
      localStorage.setItem(
        "account",
        JSON.stringify({
          username: data.username,
          password: data.password,
        })
      );
    }
    dispatch(LoginAPI(data)).then((res) => {
      // sau khi call API thành công sẽ trả về res. Trong res có chứa method là meta => requestStatus. Nếu call API thành công thì res.meta.requestStatus = fulfilled. Nếu call thất bại thì sẽ trả về rejected
      // check sau khi call thành công sẽ chuyển sang trang home
      if (res.meta.requestStatus === "fulfilled") {
        navigate(path.home);
      }
    });
  };
  useEffect(() => {
    // check trong localStorage có account không? nếu có thì dùng form của antd fill dữ liệu vào ô input
    const account = localStorage.getItem("account");
    if (account && JSON.parse(account)) {
      form.setFieldsValue({ ...JSON.parse(account) });
    }
  }, [form]);
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
      <div>
        <Form
          validateMessages={validateMessages}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ height: "40px", fontSize: "16px" }}
                  placeholder="Username"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ height: "40px", fontSize: "16px" }}
                  placeholder="Password"
                  type="password"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="save" valuePropName="checked">
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40px", fontSize: "16px" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate(path.register)}
          >
            Bạn chưa có tài khoản?
          </span>
        </Row>
      </div>
    </div>
  );
};

export default Login;
