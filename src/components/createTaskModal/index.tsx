import { useState } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { TaskAPI } from '../../api/task.api'


interface Props {
    showAgain: Function,
    update: Function
}

export const CreateTaskModal = (props: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const { Option } = Select;
    const [title, setTitle] = useState('');
    const [priorityOption, setPriorityOption] = useState('');

    const handleOk = () => {

        const priority = priorityOption === 'High' ? 0 : priorityOption === 'Mid' ? 1 : 2;

        const createTask = async () => {
            const resp = await TaskAPI.createOne({
                title,
                priority,
            })
            console.log(resp)
            //if id exists, task was succesfully created
            resp.id ? message.success(`Task #${resp.id} created.`) : message.error('Could not create task.');

        }

        createTask();
        setIsModalVisible(false);
        props.showAgain();
        props.update();
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

        <Modal title="Create task form" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <Form
                name="Daily meeting"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                placeholder='Daily meeting'
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="text"
                    rules={[{ required: true, message: 'Please input task title.' }]}

                >
                    <Input onChange={(e) => { setTitle(e.target.value) }} />
                </Form.Item>

                <Form.Item
                    label="Priority"
                    name="priority"
                    rules={[{ required: true, message: 'Please set task priority.' }]}
                >
                    <Select id="prio" value="High" onSelect={(value) => { setPriorityOption(value) }} >
                        <Option value="High">High</Option>
                        <Option value="Mid">Mid</Option>
                        <Option value="Low">Low</Option>
                    </Select>

                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={handleOk}>
                        Create Task
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    );
};