import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload, UploadProps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewProduct, changeAction, getDetail, getListProductMake, getListProductType } from "../../pages/Product/product.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  DATE_FORMAT_TYPE_YYYYMMDD
} from "../../utils/contants";
import SelectCommon from "../../utils/SelectCommon";

const DetailProduct = () => {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any[]>([])
  const [form] = Form.useForm();
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { action, dataDetail, dataProductType, dataProductMake } = useAppSelector(
    (state) => state.productReducer
  );
  useEffect(() => {
    Promise.all([
      dispatch(getListProductType()),
      dispatch(getListProductMake())
    ]);
  }, [dispatch]);
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      return false
    }
    return true
  };
  const handleChangeImage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      setFileList((oldFile) => [...oldFile, info.file.originFileObj])
      getBase64(info.file.originFileObj as RcFile, url => {
        setImageUrl((oldState) => [...oldState, url]);
      });
    }
  };
  useEffect(() => {
    if (pathname.includes("detail")) {
      dispatch(changeAction("view"));
    }
    if (pathname.includes("update")) {
      dispatch(changeAction("update"));
    }
    if (pathname.includes('addnew')) {
      dispatch(changeAction('addnew'))
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
    if (!fileList.length) {
      return toast.error('Vui lòng tải ảnh lên')
    }
    const formData = new FormData()
    Object.keys(data).forEach(item => {
      formData.append(item, data[item])
    })
    fileList.forEach(item => {
      formData.append('path', item)
    })
    dispatch(addNewProduct(formData))
  };

  const handleRemoveImage = (index: number) => {
    setImageUrl(imageUrl.filter((item, position) => position !== index))
    setFileList(fileList.filter((item, position) => position !== index))
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: action === "update" || action === 'addnew',
                  message: 'Tên sản phẩm không được để trống'
                },
              ]}
            >
              <Input
                placeholder="Tên sản phẩm"
                onBlur={(e) =>
                  form.setFieldValue("name", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="productTypeId"
              rules={[
                {
                  required: action === "update" || action === 'addnew',
                  message: 'Danh mục không được để trống'
                },
              ]}
            >
              <SelectCommon placeholder='Danh mục' options={dataProductType} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="year"
            >
              <Input
                placeholder="Năm sản xuất"
                onBlur={(e) =>
                  form.setFieldValue("year", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="makeId"
              rules={[
                {
                  required: action === "update" || action === 'addnew',
                  message: 'Nhà sản xuất không được để trống'
                },
              ]}
            >
              <SelectCommon placeholder='Nhà sản xuất' options={dataProductMake} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="weight"
              rules={[
                {
                  required: action === "update" || action === 'addnew',
                  message: 'Khối lượng sản phẩm không được để trống'
                },
              ]}
            >
              <Input
                placeholder="Khối lượng"
                onBlur={(e) =>
                  form.setFieldValue("weight", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="operationSystem"
            >
              <Input
                placeholder="Hệ điều hành"
                onBlur={(e) =>
                  form.setFieldValue("operationSystem", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="price"
              rules={[
                {
                  required: action === "update" || action === 'addnew',
                  message: 'Giá sản phẩm không được để trống'
                },
              ]}
            >
              <Input
                placeholder="Giá"
                onBlur={(e) =>
                  form.setFieldValue("price", e.target.value.trim())
                }
                disabled={action === "view"}
                type='number'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="stockQty"
              rules={[
                {
                  required: action === "update" || action === 'addnew',
                  message: 'Số lượng sản phẩm không được để trống'
                },
              ]}
            >
              <Input
                placeholder="Số lượng có sẵn"
                onBlur={(e) =>
                  form.setFieldValue("stockQty", e.target.value.trim())
                }
                disabled={action === "view"}
                type='number'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="processSpeed"
            >
              <Input
                placeholder="Tốc độ vi xử lý"
                onBlur={(e) =>
                  form.setFieldValue("processSpeed", e.target.value.trim())
                }
                disabled={action === "view"}
                type='number'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="originalCountry"
            >
              <Input
                placeholder="Xuất sứ"
                onBlur={(e) =>
                  form.setFieldValue("originalCountry", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="coreQuantity"

            >
              <Input
                placeholder="Vi xử lí"
                onBlur={(e) =>
                  form.setFieldValue("coreQuantity", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="ram"
            >
              <Input
                placeholder="Ram"
                onBlur={(e) =>
                  form.setFieldValue("ram", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="card"
            >
              <Input
                placeholder="Card hình"
                onBlur={(e) =>
                  form.setFieldValue("card", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="screenSize"
            >
              <Input
                placeholder="Kích thước màn hình"
                onBlur={(e) =>
                  form.setFieldValue("screenSize", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="screenHd"
            >
              <Input
                placeholder="Độ phân giải"
                onBlur={(e) =>
                  form.setFieldValue("screenHd", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="hardDisk"
            >
              <Input
                placeholder="Ổ cứng"
                onBlur={(e) =>
                  form.setFieldValue("hardDisk", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="pin"
            >
              <Input
                placeholder="Pin"
                onBlur={(e) =>
                  form.setFieldValue("pin", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              name="description"
            >
              <TextArea
                rows={4}
                maxLength={250}
                placeholder="Mô tả"
                onBlur={(e) =>
                  form.setFieldValue("description", e.target.value.trim())
                }
                disabled={action === "view"}
              />
            </Form.Item>
          </Col>
          {action === "update" || action === 'addnew' ? (
            <Col
              span={6}
              style={{ display: "flex", justifyContent: "flex-end", alignItems: 'flex-end' }}
            >
              <Form.Item>
                <Button className="search" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          ) : null}
          <Col span={24} className="image-upload">
            {imageUrl.map((item: string, index: number) => (
              <div style={{ width: '219px', height: '129px', position: 'relative' }}>
                <img src={item} style={{ width: '100%', height: '100%', marginRight: '4px' }} alt='anh dep' />
                <CloseOutlined style={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer', color: 'red' }} onClick={() => handleRemoveImage(index)} />
              </div>
            ))}
          </Col>
          <Col span={24} style={{ textAlign: 'center', marginTop: '12px' }}>
            <Upload
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChangeImage}>

              <div className="upload-image">
                <UploadOutlined />
                <span>Tải ảnh lên</span>
              </div>
            </Upload>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailProduct;
