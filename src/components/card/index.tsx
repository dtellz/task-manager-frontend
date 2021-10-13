import { Skeleton, Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { TaskAPI } from '../../api/task.api';
import React from 'react';
import cardAvatar from '../../assets/card-avatar.png'

const { Meta } = Card;

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

    const taskStatus = props.taskStatus === 0 ? 'Status: pending' : props.taskStatus === 1 ? 'Status: Done' : 'Status: Cancelled';

    const taskPriority = props.taskPriority === 0 ? 'Priority: high' : props.taskStatus === 1 ? 'Status: Mid' : 'Status: Low';

    const realTime = new Date(props.taskEnd).valueOf() * 1;
    const checker = new Date().valueOf() * 1;

    let finishedTime = '-'

    if ((checker - realTime) > 60000 && props.taskStatus !== 0) { // we set 1 minute as margin time to check wether the task is really finished or it arrived with the value set by default on front end (new Date())

        const handler = new Date(props.taskEnd);
        //lets format the date to a proper human readable state
        finishedTime = `${handler.getDate()}/${(handler.getMonth() + 1)}/${handler.getFullYear()} at ${handler.getHours() < 10 ? '0' + handler.getHours() : handler.getHours()}:${handler.getMinutes() < 10 ? '0' + handler.getMinutes() : handler.getMinutes()}:${handler.getSeconds() < 10 ? '0' + handler.getSeconds() : handler.getSeconds()}`
    }


    function change() {
        setState({ loading: false });
    }
    function handleEdit() {

    }
    function handleDeletion() {

        async function del() {

            await TaskAPI.deleteOne(props.taskId);

        }
        del();
        props.update();

    }
    if (props.loaded && state.loading) {
        setTimeout(() => { change(); }, 600) //only with big data skeleton will show, but its visually appealing so lets delay data show a lil bit

    }

    return (
        <React.Fragment>

            <Card
                style={{ minWidth: 300, height: 230, marginTop: 16, marginBottom: 16, bottom: 32, top: 32 }}
                actions={[
                    <EditOutlined key="edit" onClick={handleEdit} />,
                    <DeleteOutlined key="delete" onClick={handleDeletion} />

                ]}
            >
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

