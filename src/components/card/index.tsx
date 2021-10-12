import { Skeleton, Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
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
}


const TaskCard: FC<CardProps> = (props): JSX.Element => {

    const [state, setState] = useState({ loading: true })
    const taskStatus = props.taskStatus === 0 ? 'Status: pending' : props.taskStatus === 1 ? 'Status: Done' : 'Status: Cancelled';
    const taskPriority = props.taskPriority === 0 ? 'Priority: high' : props.taskStatus === 1 ? 'Status: Mid' : 'Status: Low';
    const checkTime = new Date()


    function change() {
        setState({ loading: false });
    }
    function handleEdit() {

    }
    if (props.loaded && state.loading) {
        setTimeout(() => { change(); }, 600) //only in big loads skeleton will show, but i love its effect so lets delay it a lil bit

    }

    // const onchange = (checked) => {
    //     setState({ loading: !checked });
    // };
    return (
        <React.Fragment>
            {/* <Switch checked={!state.loading} onChange={change} /> */}


            <Card
                style={{ width: 300, height: 190, marginTop: 16 }}
                actions={[
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="setting" onClick={handleEdit} />

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
                    {/* <p style={{ paddingLeft: 55 }}>{props.taskEnd}</p> */}
                </Skeleton>

            </Card>
        </React.Fragment>
    )
}

export default TaskCard;

