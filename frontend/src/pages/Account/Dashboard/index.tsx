import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Row, Col, Table, Card, Statistic, Progress, Button } from "antd";

import {
  ArrowUpOutlined,
  DollarOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import IRemoteData, {
  fromLoading,
  fromLoaded,
} from "../../../core/IRemoteData";
import {
  ProjectResourceApi,
  ProjectDTO,
  TransactionResourceApi,
} from "cloudsourced-api";
import { api } from "../../../core/api";
import ProjectCard from "../../ProjectPage/ProjectCard";
import { UserDTO } from "../../../../gen/api/src/models";

interface IProps extends RouteComponentProps {}
const now = new Date();

const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
const monthDay = now.getDate();
const mondayThisWeek = monthDay - weekDay;
const startOfThisWeek = new Date(+now);
startOfThisWeek.setDate(mondayThisWeek);
startOfThisWeek.setHours(0, 0, 0, 0);
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
interface projectData {
  key: string;
  number: number;
  project: ProjectDTO;
  projectName: string;
  id: number;
}
interface UserTransaction {
  id?: number;
  points?: number;
  user?: UserDTO;
}

const Dashboard: React.FC<IProps> = (props) => {
  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Current projects",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Button
          shape="circle"
          onClick={() => props.history.push("/projects/" + id.toString())}
        >
          <RightOutlined />
        </Button>
      ),
    },
  ];
  const [projects, setProjects] = useState<IRemoteData<projectData[], null>>(
    fromLoading()
  );
  const [transactions, setTransactions] = useState<
    IRemoteData<UserTransaction[], null>
  >(fromLoading());
  const [points, setPoints] = useState<IRemoteData<number, null>>(
    fromLoading()
  );
  const [latestProject, setLatestProjects] = useState<
    IRemoteData<projectData, null>
  >(fromLoading());
  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi(
        api.config
      ).getProjectsByUserUsingGET();
      const userTransactionData = await new TransactionResourceApi(
        api.config
      ).getAllTransactionForAUserUsingGET();
      const data: projectData[] = result.map((p, i) => ({
        key: i.toString(),
        number: i,
        project: p,
        projectName: p.name ? p.name : "",
        id: p.id ? p.id : 0,
      }));

      data.sort((a, b) => {
        return b.project.createdAt!.getTime() - a.project.createdAt!.getTime();
      });
      setProjects(fromLoaded(data));
      const userTransactions: UserTransaction[] = userTransactionData.map(
        (p, i) => ({
          key: i.toString(),
          id: p.id,
          points: p.points,
        })
      );
      setTransactions(fromLoaded(userTransactions));
      let points: number = transactions.data
        ? (transactions.data
            .map((a) => a.points)
            .reduce((a, b) => {
              return a! + b!;
            }) as number)
        : 0;

      setPoints(fromLoaded(points));
      setLatestProjects(fromLoaded(data[0]));
    })();
  }, []);
  return (
    <>
      <Row justify="center" gutter={[24, 24]}>
        <Col span={16}>
          <Row justify="center" gutter={[24, 24]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Projects this week"
                  value={
                    projects.data?.filter(
                      (p) => p.project.createdAt! > startOfThisWeek
                    ).length
                  }
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Your points"
                  value={points.data as number}
                  precision={0}
                  valueStyle={{ color: "#1890ff" }}
                  prefix={<DollarOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Points this week"
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
                  <Title level={4}>Finished projects</Title>
                  <Progress percent={50} status="active" />
                </div>
                <div>
                  <Title level={4}>Finished tasks</Title>
                  <Progress percent={70} status="active" />
                </div>
                <div>
                  <Title level={4}>Received points</Title>
                  <Progress percent={100} />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card>
            <Title
              level={3}
              style={{ textAlign: "center", marginTop: "-0.5em" }}
            >
              Latest project
            </Title>
            {latestProject.data?.project ? (
              <ProjectCard project={latestProject.data?.project} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <p>You have no projects, please create a new project!</p>
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => props.history.push("/user/project/create")}
                >
                  <PlusOutlined />
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]}>
        <Col span={8}>
          <Card>
            <Table
              pagination={false}
              dataSource={projects.data ? projects.data : []}
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
