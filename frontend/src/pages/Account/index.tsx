import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Row, Button, PageHeader, Menu, Col, Table, Card } from "antd";

import { PlusOutlined, SettingOutlined } from "@ant-design/icons";

interface IProps extends RouteComponentProps {}
const dataSource = [
  {
    key: "1",
    number: 1,
    project: "test project",
  },
  {
    key: "2",
    number: 2,
    project: "test project",
  },
  {
    key: "3",
    number: 3,
    project: "test project",
  },
];

const columns = [
  {
    title: "#",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
  },
];
const AccountPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <PageHeader
        className="site-page-header"
        title="My account"
        extra={[
          <Button
            type="primary"
            shape="circle"
            onClick={() => props.history.push("/user/project/create")}
          >
            <PlusOutlined />
          </Button>,
        ]}
      />
      <div className="Grid" style={{ padding: 20 }}>
        <Row>
          <Col span={4}>
            <Menu
              // onClick={this.handleClick}
              style={{ width: 256, height: "100%" }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <Menu.Item key="1">Dashboard</Menu.Item>
              <Menu.Item key="2">Projects</Menu.Item>
              <Menu.Item key="3">Transactions</Menu.Item>

              <Menu.Item key="4">Developers</Menu.Item>
              <Menu.Item key="5">
                {" "}
                <span>
                  <SettingOutlined />
                  <span>Settings</span>
                </span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
            <Row justify="center" gutter={[24, 24]}>
              <Col span={16}>
                <Row justify="center" gutter={[24, 24]}>
                  <Col span={8}>
                    {" "}
                    <Card title="Current Projects" bordered={false}>
                      10002
                    </Card>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <Card title="Current tasks" bordered={false}>
                      124555
                    </Card>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <Card title="Points" bordered={false}>
                      12324456
                    </Card>
                  </Col>
                </Row>
                <Row justify="center" gutter={[24, 24]}>
                  graph
                </Row>
              </Col>
              <Col span={6}>
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </Col>
            </Row>
            <Row justify="center" gutter={[24, 24]}>
              <Col span={8}>
                {" "}
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </Col>
              <Col span={8}>
                {" "}
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </Col>
              <Col span={6}>
                {" "}
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(AccountPage);
