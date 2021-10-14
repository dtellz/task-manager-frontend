import { Skeleton, Card, Avatar, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { TaskAPI } from '../../api/task.api';
import React from 'react';
import cardAvatar from '../../assets/card-avatar.png'
import { UpdateTaskModal } from '../updateTaskModal';

const { Meta } = Card;

//TODO-impleted failure cases


interface CardProps {
    taskId: number,
    taskTitle: string,
    taskStatus: number,
    taskPriority: number,
    taskEnd: Date,
    loaded: boolean,
    update: Function
}


const TaskCard: FC<CardProps> = (props): JSX.Element => {



    const [state, setState] = useState({ loading: true })
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [update, setUpdate] = useState(false);

    const taskStatus = props.taskStatus === 0 ? 'Status: pending' : props.taskStatus === 1 ? 'Status: Done' : 'Status: Cancelled';

    const taskPriority = props.taskPriority === 0 ? 'Priority: high' : props.taskStatus === 1 ? 'Priority: Mid' : 'Priority: Low';

    const realTime = new Date(props.taskEnd).valueOf() * 1;
    const checker = new Date().valueOf() * 1;

    let finishedTime = '-'

    function formatDate() {

        const handler = new Date(props.taskEnd);
        let formatedTime = `${handler.getDate()}/${(handler.getMonth() + 1)}/${handler.getFullYear()} at ${handler.getHours() < 10 ? '0' + handler.getHours() : handler.getHours()}:${handler.getMinutes() < 10 ? '0' + handler.getMinutes() : handler.getMinutes()}:${handler.getSeconds() < 10 ? '0' + handler.getSeconds() : handler.getSeconds()}`

        return formatedTime;
    }

    //only show date on done or cancelled tasks, never for a pending one
    if (props.taskStatus !== 0) {
        finishedTime = formatDate();
    } else {
        finishedTime = '-'
    }

    function updateRender() {
        update === false ? setUpdate(true) : setUpdate(false);
    }
    function resetUpdateModal() {
        setshowUpdateModal(false)
    }
    function handleUpdateModalShow() {
        setshowUpdateModal(true);
        //we re-render for new tasks to show. Might be kind of inefficient but it will do the job for now.
        updateRender();
    }

    function change() {
        setState({ loading: false });
    }

    //This function rerenders app.ts instructed from a subchild component. If app grows might be good to implement redux
    function reRender() {
        props.update();
    }

    function handleDeletion() {

        async function del() {

            await TaskAPI.deleteOne(props.taskId);

        }
        const res = del();
        res === undefined ? message.error('Could not delete task.') : message.success(`Task #${props.taskId} deleted.`);
        props.update();

    }
    if (props.loaded && state.loading) {
        setTimeout(() => { change(); }, 600) //only with big data skeleton will show, but its visually appealing so lets delay data show a lil bit

    }



    return (
        <React.Fragment>

            <Card
                hoverable
                style={{ minWidth: 300, height: 230, marginTop: 16, marginBottom: 16, bottom: 32, top: 32 }}
                actions={[
                    <EditOutlined key="edit" onClick={handleUpdateModalShow} />,
                    <DeleteOutlined key="delete" onClick={handleDeletion} />
                ]}
            >
                {showUpdateModal ? <UpdateTaskModal update={reRender} showAgain={resetUpdateModal} taskId={props.taskId} taskStatus={props.taskStatus} taskEndTime={props.taskEnd}></UpdateTaskModal> : console.log()}
                <Skeleton loading={state.loading} avatar active>
                    <Meta
                        avatar={
                            <Avatar src={cardAvatar} />
                        }
                        title={props.taskTitle}
                        description={taskStatus}

                    />
                    <p style={{ paddingLeft: 55, paddingTop: 5 }}>{taskPriority}</p>
                    <p style={{ paddingLeft: 55, paddingTop: 5 }}>{finishedTime}</p>
                </Skeleton>

            </Card>
        </React.Fragment>
    )
}

export default TaskCard;

