import { useState } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { TaskAPI } from '../../api/task.api'


interface Props {
    showAgain: Function,
    update: Function,
    taskId: Number,
    taskStatus: Number,
    taskEndTime: Date
}

export const UpdateTaskModal = (props: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const { Option } = Select;
    const [title, setTitle] = useState('');
    const [priorityOption, setPriorityOption] = useState('');
    const [statusOption, setStatusOption] = useState('');


    const handleOk = () => {

        const priority = priorityOption === 'High' ? 0 : priorityOption === 'Mid' ? 1 : 2;
        const status = statusOption === 'Pending' ? 0 : statusOption === 'Done' ? 1 : 2;
        const endTime = statusOption === 'Done' ? new Date() : props.taskEndTime;

        const updateTask = async () => {
            const resp = await TaskAPI.updateOne({
                title,
                status,
                priority,
                endTime,
            }, props.taskId)
            resp.id ? message.success(`Task #${resp.id} updated.`) : message.error('Could not update task.');
        }

        updateTask();
        setIsModalVisible(false);
        props.showAgain();
        props.update();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        props.showAgain();
    };

    return (

        <Modal title="Update task form" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            {/* conditional render to only show update form on pending tasks */}
            {props.taskStatus === 0 ? <Form
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
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please set task status.' }]}
                >
                    <Select id="stat" value="Pending" onSelect={(value) => { setStatusOption(value) }} >
                        <Option value="Pending">Pending</Option>
                        <Option value="Done">Done</Option>
                        <Option value="Cancelled">Cancelled</Option>
                    </Select>

                </Form.Item>

                {statusOption === 'Pending' ? <Form.Item
                    label="Priority"
                    name="priority"
                    rules={[{ required: true, message: 'Please set task priority.' }]}
                >
                    <Select id="prio" value="High" onSelect={(value) => { setPriorityOption(value) }} >
                        <Option value="High">High</Option>
                        <Option value="Mid">Mid</Option>
                        <Option value="Low">Low</Option>
                    </Select>

                </Form.Item> : console.log()}


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={handleOk}>
                        Update Task
                    </Button>
                </Form.Item>
            </Form> : <p>You cant update a finished or cancelled task. Please create a new one.</p>}
        </Modal>

    );
};