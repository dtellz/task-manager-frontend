import React, { useState } from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';


interface Props {
    showAgain: Function
}

export const CreateTaskModal = (props: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleOk = () => {




        setIsModalVisible(false);
        props.showAgain();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        props.showAgain();
    };

    // const Demo = () => {
    //     const onFinish = (values: any) => {
    //         console.log('Success:', values);
    //     };

    //     const onFinishFailed = (errorInfo: any) => {
    //         console.log('Failed:', errorInfo);
    //     };

    return (

        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="text"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Create Task
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    );
};