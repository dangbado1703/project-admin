import { UserOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Button, Modal, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDataNotify, replyComment } from "./notify.reducer";

interface IFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DetailComment = ({ isOpen, setIsOpen }: IFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { dataComment } = useAppSelector((state) => state.notifyReducer);
  const handleSubmit = (data: any) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const body = {
      userId: user.userId,
      replyCommentId: (dataComment as any)?.commentId,
      productId: (dataComment as any)?.productId,
      content: data.content,
    };
    dispatch(replyComment(body)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsOpen(false);
        form.resetFields();
        dispatch(getDataNotify());
      }
    });
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={
          <div>
            <Button htmlType="submit" onClick={form.submit}>
              Gửi
            </Button>
          </div>
        }
      >
        <div>
          <div style={{ marginBottom: "12px" }}>
            <Avatar
              style={{ marginRight: "8px", backgroundColor: "#87d068" }}
              size={50}
              icon={<UserOutlined />}
            />
            <span>Người dùng comment</span>
          </div>
          <div>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                name="content"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DetailComment;
