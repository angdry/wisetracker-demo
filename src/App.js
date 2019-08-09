import React, { Component } from "react";
import {
  Layout,
  Menu,
  Icon,
  Tabs,
  Descriptions,
  Switch,
  Input,
  Button,
  Table,
  Modal
} from "antd";
import "./App.css";
import cogs from "./assets/cogs.svg";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const columns = [
  {
    title: "Name",
    dataIndex: "name",

    // specify the condition of filtering result
    // here is that finding the name started with `value`

    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"]
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age
  },
  {
    title: "Address",
    dataIndex: "address",

    filterMultiple: false,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Edit",
    dataIndex: "edit",
    render: (text, record) => <img src={cogs} />,
    filterMultiple: false
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
function onPaging(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

class App extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    loading: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });

    if (this.state.collapsed === true) {
      console.log("open");
    } else {
      console.log("off");
    }
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <Layout>
        <Sider
          style={{
            minHeight: "100vh",
            left: 0
          }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={240}
          breakpoint="md"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            this.toggle();
          }}
          collapsedWidth="73"
        >
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggle}
          />
          <div className="logo" />
          <Menu mode="inline" defaultSelectedKeys={["4"]}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Statistics</span>
                </span>
              }
            >
              <Menu.Item key="3">Dashboard List</Menu.Item>
              <Menu.Item key="4">Datacard List</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">Live Tracker</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">Audience</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="bar-chart" />
              <span className="nav-text">Advertise</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="cloud-o" />
              <span className="nav-text">Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="container">
            <div className="page-title">Setting</div>
            <div className="container-content">
              <Tabs defaultActiveKey="2" animated={false}>
                <TabPane tab="Basic" key="1">
                  <div className="container-tabpane">
                    <Descriptions
                      column={1}
                      layout="horizontal"
                      bordered={true}
                      size="middle"
                      className="RW-Descriptions"
                    >
                      <Descriptions.Item label="* Profile Name :">
                        <Input value="Profile Name" style={{ width: "30%" }} />
                      </Descriptions.Item>
                      <Descriptions.Item label="Universal Link (iOS Only) :">
                        <Switch defaultChecked onChange={onChange} />
                      </Descriptions.Item>
                      <Descriptions.Item label="Realtime Postback :">
                        <Switch defaultChecked onChange={onChange} />
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                  <div className="container-savebar">
                    <span className="save-message">저장에 성공하였습니다</span>
                    <Button type="default">CANCEL</Button>
                    <Button type="danger">DELETE</Button>
                    <Button type="primary">SAVE</Button>
                    <Button type="primary" loading="true">
                      SAVE
                    </Button>
                    <Button disabled="true" type="primary">
                      SAVE
                    </Button>
                  </div>
                </TabPane>
                <TabPane tab="Apps" key="2">
                  <div className="container-tabpane">
                    <div className="container-topbtns">
                      <Button type="primary" onClick={this.showModal}>
                        Add New App/Web
                      </Button>
                    </div>

                    <Table
                      columns={columns}
                      dataSource={data}
                      onChange={onPaging}
                    />
                  </div>
                </TabPane>
                <TabPane tab="SDK Guide" key="3">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="NAVER Pay" key="4">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
        <Modal
          title="Basic Modal"
          width="620px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="default" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Layout>
    );
  }
}

export default App;
