import './App.css';
import { useEffect, useState } from 'react';
import { TaskAPI } from './api/task.api';
import { TaskDTO } from './api/dto/task.dto'
import itopLogo from './assets/Itop-a30c6bc6.png'
// import curieLogo from './assets/curie-logo.png'
import { Layout, Menu, Breadcrumb } from 'antd';
import TaskCard from './components/card/index'

const { Header, Footer, Content } = Layout;

function App() {

  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchAll() {

      const resp = await TaskAPI.getAll();

      setTasks(resp);
      setIsLoaded(true);
    }

    fetchAll();

  }, [])

  const taskCards = tasks.map((t, i) => {
    const finished = t.endTime ?? new Date();
    return <TaskCard taskId={t.id} taskTitle={t.title} taskStatus={t.status} taskPriority={t.priority} taskEnd={finished} key={i} loaded={isLoaded}></TaskCard>
  })

  return (

    <Layout className="layout">
      <Header className="header">
        <img src={itopLogo} alt="company-logo" className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {/* {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })} */}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Task Manager</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          {taskCards}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Diego Téllez</Footer>
    </Layout>

  );
}

export default App;




