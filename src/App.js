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
  Col,
  Card,
  Radio,
  Form,
  Collapse,
  DatePicker
} from "antd";
import "./App.css";
import cogs from "./assets/cogs.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash-alt.svg";
import collapslnb from "./assets/bars.svg";
import moment from "moment";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Search } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

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
    width: 80,
    render: (text, record) => (
      <Dropdown overlay={menu} trigger={["click"]}>
        <img src={cogs} alt="관리" />
      </Dropdown>
    ),
    filterMultiple: false
  }
];

const data = [];
for (let i = 1; i <= 500; i++) {
  data.push({
    key: i,
    name: "John Brown",
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`
  });
}

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
    windowBreakpoint: false,
    size: "default",
    collapseSize: 73,
    globalFilter: false
  };

  componentDidMount = () => {
    this.windowBreakpoint();
  };
  componentWillUnmount = () => {
    this.removeEventListener();
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
    console.log(e.target.value);
  };
  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  removeEventListener = () => {
    // 이벤트리스너 삭제용 함수
    window.removeEventListener("resize", this.windowBreakpoint);
  };
  windowBreakpoint = () => {
    window.addEventListener("resize", this.windowBreakpoint);
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
    // 휴대폰 사이즈에서 sider 사이즈 줄이기
    if (this.state.windowBreakpoint === "sm") {
      this.setState({
        collapseSize: 0
      });
    } else {
      this.setState({
        collapseSize: 73
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

  globalFilter = value => {
    if (this.state.globalFilter === false) {
      return (
        <div className="container-filter-prev">
          <div className="trigger-filter" />
          <FormItem>
            <img src={cogs} alt="관리" />
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month")
                ]
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onChange}
            />
          </FormItem>
        </div>
      );
    } else {
      return "";
    }
  };

  openGlobalFilter = value => {
    console.log(value);
    if (value.length === 0) {
      this.setState({
        globalFilter: false
      });
    } else {
      this.setState({
        globalFilter: true
      });
    }
    console.log(this.state.globalFilter);
  };
  render() {
    const { state } = this;
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
          collapsedWidth={this.state.collapseSize}
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
              <Tabs defaultActiveKey="1" animated={false}>
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
            <div className="container-content">
              <div className="container-filter">
                <Collapse
                  bordered={false}
                  onChange={value => this.openGlobalFilter(value)}
                  defaultActiveKey={"1"}
                >
                  <Panel header={this.globalFilter()} key="1" showArrow={false}>
                    <Tabs defaultActiveKey="1" animated={false}>
                      <TabPane tab="Basic" key="1">
                        <div className="container-tabpane">
                          <Row gutter={25}>
                            <Col className="gutter-row" sm={12} xl={6} />
                            <Col className="gutter-row" sm={12} xl={6} />
                          </Row>
                          <Descriptions layout="vertical">
                            <Descriptions.Item
                              label="Date Range"
                              style={{ minWidth: 350 }}
                            >
                              <RangePicker
                                ranges={{
                                  Today: [moment(), moment()],
                                  "This Month": [
                                    moment().startOf("month"),
                                    moment().endOf("month")
                                  ],
                                  "This Month123": [
                                    moment().startOf("month"),
                                    moment().endOf("month")
                                  ],
                                  "This Month412": [
                                    moment().startOf("month"),
                                    moment().endOf("month")
                                  ],
                                  "This Month123": [
                                    moment().startOf("month"),
                                    moment().endOf("month")
                                  ]
                                }}
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                                onChange={onChange}
                              />
                            </Descriptions.Item>
                            <Descriptions.Item label="Date Type">
                              <Radio.Group
                                size="default"
                                value={state.size}
                                onChange={this.handleSizeChange}
                                buttonStyle="solid"
                              >
                                <Radio.Button value="default">
                                  시간
                                </Radio.Button>
                                <Radio.Button value="middle">일</Radio.Button>
                                <Radio.Button value="small">주</Radio.Button>
                                <Radio.Button value="small">월</Radio.Button>
                              </Radio.Group>
                            </Descriptions.Item>
                          </Descriptions>
                        </div>
                      </TabPane>
                      <TabPane tab="Metrics" key="2">
                        <div className="container-tabpane">
                          ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅁㅇㄴ
                        </div>
                      </TabPane>
                    </Tabs>
                    <div className="container-savebar">
                      <span className="save-message">
                        저장에 성공하였습니다
                      </span>
                      <Button type="default">CANCEL</Button>
                      <Button type="primary">SAVE</Button>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>
            <Row gutter={25}>
              <Col className="gutter-row" sm={12} xl={6}>
                <Card
                  className="container-content KPI-3metrics"
                  bordered={false}
                >
                  <div>
                    <span className="card-title-20">Total Installs</span>
                    <span className="card-num-18">601,474</span>
                  </div>
                  <div>
                    <span className="card-title-18">3rd Party</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(97%)</span>
                  </div>
                  <div>
                    <span className="card-title-18">In-App</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(96%)</span>
                  </div>
                </Card>
              </Col>
              <Col className="gutter-row" sm={12} xl={6}>
                <Card
                  className="container-content KPI-3metrics"
                  bordered={false}
                >
                  <div>
                    <span className="card-title-20">Total NRUs</span>
                    <span className="card-num-18">601,474</span>
                  </div>
                  <div>
                    <span className="card-title-18">3rd Party</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(97%)</span>
                  </div>
                  <div>
                    <span className="card-title-18">In-App</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(96%)</span>
                  </div>
                </Card>
              </Col>
              <Col className="gutter-row" sm={12} xl={6}>
                <Card
                  className="container-content KPI-3metrics"
                  bordered={false}
                >
                  <div>
                    <span className="card-title-20">Registration Rate</span>
                    <span className="card-num-18">601,474</span>
                  </div>
                  <div>
                    <span className="card-title-18">3rd Party</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(97%)</span>
                  </div>
                  <div>
                    <span className="card-title-18">In-App</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(96%)</span>
                  </div>
                </Card>
              </Col>
              <Col className="gutter-row" sm={12} xl={6}>
                <Card
                  className="container-content KPI-3metrics"
                  bordered={false}
                >
                  <div>
                    <span className="card-title-20">Total Revenue</span>
                    <span className="card-num-18">601,474</span>
                  </div>
                  <div>
                    <span className="card-title-18">3rd Party</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(97%)</span>
                  </div>
                  <div>
                    <span className="card-title-18">In-App</span>
                    <span className="card-num-16">601,474</span>
                    <span className="card-num-12">(96%)</span>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="container-content">
              <div className="container-table">
                <Row gutter={0} className="table-header">
                  <Col sm={24} md={12}>
                    <span className="font-20 font-bold align-left">
                      Media Performance
                    </span>
                  </Col>
                  <Col sm={24} md={12} className="align-right">
                    <FormItem>
                      <Search
                        placeholder="Search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                      />
                      <Radio.Group
                        size="default"
                        value={state.size}
                        onChange={this.handleSizeChange}
                        buttonStyle="solid"
                      >
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="middle">M</Radio.Button>
                        <Radio.Button value="small">S</Radio.Button>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Table
                  size={this.state.size}
                  columns={columns}
                  dataSource={data}
                  onChange={onPaging}
                  pagination={{
                    defaultCurrent: 1,
                    pageSize: 10,
                    pageSizeOptions: ["10", "20", "30", "50", "100"],
                    showSizeChanger: true
                  }}
                />
              </div>
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
