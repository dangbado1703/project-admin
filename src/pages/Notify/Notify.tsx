import { Avatar, Modal, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDataNotify, getDetailNotify } from "./notify.reducer";
import { UserOutlined } from "@ant-design/icons";
import "./notify.scss";
import DetailComment from "./DetailComment";

const Notify = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const dispatch = useAppDispatch();
  const { dataNotify } = useAppSelector((state) => state.notifyReducer);
  useEffect(() => {
    dispatch(getDataNotify());
  }, [dispatch]);
  const handleGetDetailNotify = (id: string | null) => {
    if (id) {
      setIsOpenDetail(true);
      dispatch(getDetailNotify(id));
    }
  };
  return (
    <div>
      <Modal
        open={isOpen}
        title="Thông báo"
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        {dataNotify.map((item: any) => (
          <div className="notify">
            <div>
              {!item.customerDTO?.avatar ? (
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              ) : (
                <Avatar size={64} src={item.customerDTO?.avatar} />
              )}
            </div>
            <div className="notify_info">
              <span className="nameUser">{item.customerDTO?.username}</span>
              <ReactTimeAgo date={item.createdDate} />
              <span>{item?.content}</span>
              {item.isComment ? (
                <div>
                  <Button
                    type="link"
                    style={{ background: "#E23744", color: "white" }}
                    onClick={() => handleGetDetailNotify(item.commentId)}
                  >
                    Trả lời
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </Modal>
      <DetailComment isOpen={isOpenDetail} setIsOpen={setIsOpenDetail} />
    </div>
  );
};

export default Notify;
