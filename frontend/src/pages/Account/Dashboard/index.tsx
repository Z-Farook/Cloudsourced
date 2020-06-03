import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Row, Col, Table, Card, Statistic, Timeline, Progress } from "antd";

import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

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
const dataSourceTasks = [
  {
    key: "1",
    number: 1,
    project: "test task",
  },
  {
    key: "2",
    number: 2,
    project: "test task",
  },
  {
    key: "3",
    number: 3,
    project: "test task",
  },
];
const dataSourceTransactions = [
  {
    key: "1",
    number: 1,
    project: "test transaction",
  },
  {
    key: "2",
    number: 2,
    project: "test transaction",
  },
  {
    key: "3",
    number: 3,
    project: "test transaction",
  },
];
const columns = [
  {
    title: "#",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Current projects",
    dataIndex: "project",
    key: "project",
  },
];
const columnsTasks = [
  {
    title: "#",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Current Tasks",
    dataIndex: "project",
    key: "project",
  },
];
const columnsTransactions = [
  {
    title: "#",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Latest transactions",
    dataIndex: "project",
    key: "project",
  },
];

const Dashboard: React.FC<IProps> = (props) => {
  return (
    <>
      <Row justify="center" gutter={[24, 24]}>
        <Col span={16}>
          <Row justify="center" gutter={[24, 24]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Projects"
                  value={30.57}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Tasks"
                  value={19.21}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Points"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Row justify="center" gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <Title>Progress</Title>
                <br />
                <div>
                  <Title level={4}>Closed projects</Title>
                  <Progress percent={50} status="active" />
                </div>
                <div>
                  <Title level={4}>Closed tasks</Title>
                  <Progress percent={70} status="active" />
                </div>
                <div>
                  <Title level={4}>Closed points</Title>
                  <Progress percent={100} />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card>
            <Title>Latest project</Title>
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]}>
        <Col span={8}>
          <Card>
            <Table
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Table
              pagination={false}
              dataSource={dataSourceTasks}
              columns={columnsTasks}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Table
              pagination={false}
              dataSource={dataSourceTransactions}
              columns={columnsTransactions}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Dashboard);
