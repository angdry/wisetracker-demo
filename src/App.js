import React from "react";
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
  Modal,
  Dropdown,
  Row,
  Col
} from "antd";
import "./App.css";
import cogs from "./assets/cogs.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash-alt.svg";
import collapslnb from "./assets/bars.svg";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <img src={edit} alt="Edit" className="dwopdown-icon" />
      Edit
    </Menu.Item>
    <Menu.Item key="1">
      <img src={trash} alt="Delete" className="dwopdown-icon" />
      Delete
    </Menu.Item>
  </Menu>
);
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
    render: (text, record) => (
      <Dropdown overlay={menu} trigger={["click"]}>
        <img src={cogs} alt="관리" />
      </Dropdown>
    ),
    filterMultiple: false
  }
];

const data = [
  {
    key: "1",
    name: "John Brown1",
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
    loading: false,
    windowBreakpoint: false
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.windowBreakpoint);
  };
  componentWillUnmount = () => {
    this.removeEventListener();
  };

  removeEventListener = () => {
    // 이벤트리스너 삭제용 함수
    window.removeEventListener("resize", this.windowBreakpoint);
  };
  windowBreakpoint = () => {
    if (window.innerWidth < 1600) {
      this.setState({
        windowBreakpoint: "xxl"
      });
    }
    if (window.innerWidth < 1200) {
      this.setState({
        windowBreakpoint: "xl"
      });
    }
    if (window.innerWidth < 992) {
      this.setState({
        windowBreakpoint: "lg"
      });
    }
    if (window.innerWidth < 768) {
      this.setState({
        windowBreakpoint: "md"
      });
    }
    if (window.innerWidth < 576) {
      this.setState({
        windowBreakpoint: "sm"
      });
    }
    if (window.innerWidth < 480) {
      this.setState({
        windowBreakpoint: "xs"
      });
    }
    console.log(this.state.windowBreakpoint);
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
          <img
            className="trigger"
            src={collapslnb}
            alt="Edit"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggle}
          />
          <div className="logo" />
          <Menu mode="inline" defaultSelectedKeys={["3"]}>
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
            <Menu.Item key="5">
              <Icon type="video-camera" />
              <span className="nav-text">Live Tracker</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="upload" />
              <span className="nav-text">Audience</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="bar-chart" />
              <span className="nav-text">Advertise</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="cloud-o" />
              <span className="nav-text">Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="container">
            <div className="page-title">Setting</div>
            <div className="container-content">
              <Tabs defaultActiveKey="3" animated={false}>
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
                    <Button type="primary" loading>
                      SAVE
                    </Button>
                    <Button disabled={true} type="primary">
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
                  <div className="container-tabpane">
                    <Tabs
                      defaultActiveKey="1"
                      tabPosition="left"
                      animated={false}
                    >
                      <TabPane tab="Overview" key="1">
                        overview
                      </TabPane>
                      <TabPane tab="JAVA" key="2">
                        java
                      </TabPane>
                      <TabPane tab="Swift" key="3">
                        swift
                      </TabPane>
                    </Tabs>
                  </div>
                </TabPane>
                <TabPane tab="NAVER Pay" key="4">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
            <Row gutter={25}>
              <Col className="gutter-row" span={6}>
                <div className="container-content" />
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="container-content">ㅁㄴㅇ</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="container-content">ㅁㄴㅇ</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="container-content">ㅁㄴㅇ</div>
              </Col>
            </Row>
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
