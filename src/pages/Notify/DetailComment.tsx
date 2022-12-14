import { Avatar, Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

interface IFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DetailComment = ({ isOpen, setIsOpen }: IFormProps) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={
          <div>
            <Button>Gửi</Button>
          </div>
        }
      >
        <div>
          <div>
            <Avatar />
            <span>Người dùng comment</span>
          </div>
          <div>
            <TextArea rows={4} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DetailComment;
