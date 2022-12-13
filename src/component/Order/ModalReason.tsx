import { Button, Col, Form, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { IFormSearchOrder } from '../../model/Order.model'
import { cancelOrder, getDataSearch } from '../../pages/Order/order.reducer'
import { useAppDispatch } from '../../store/hooks'


interface IFormPropsModal {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    orderId: number | null
    valueSearch: IFormSearchOrder
    page: number
    size: number
}
const ModalReason = ({ isOpen, setIsOpen, orderId, valueSearch, page, size }: IFormPropsModal) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const handleCancel = () => {
        setIsOpen(false)
        form.resetFields()
    }

    const handleSubmit = (data: any) => {
        console.log('data')
        setIsLoading(true)
        dispatch(cancelOrder({ orderId, reason: data.reason })).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
                setIsOpen(false)
                form.resetFields()
                setIsLoading(false)
                dispatch(getDataSearch({ ...valueSearch, page, size }))
            }
        })
    }
    const footer: React.ReactNode = (
        <div>
            <Button className='search' onClick={() => form.submit()} loading={isLoading}>Đồng ý</Button>
            <Button className='delete' onClick={handleCancel}>Huỷ</Button>
        </div>
    )
    return (
        <Modal open={isOpen} onCancel={handleCancel} onOk={() => form.submit()} footer={footer} closable={false}>
            <Form form={form} onFinish={handleSubmit} requiredMark={false}>
                <Row>
                    <Col span={24}>
                        <Form.Item name='reason' rules={[{ required: true, message: 'Vui lòng nhập lí do của bạn' }]}>
                            <TextArea placeholder='Nhập lí do của bạn' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalReason