import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import {
  Row,
  Col,
  Table,
  Card,
  Statistic,
  Timeline,
  Progress,
  Button,
} from "antd";

import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import IRemoteData, {
  fromLoading,
  fromLoaded,
} from "../../../core/IRemoteData";
import { Project, ProjectResourceApi, ProjectDTO } from "cloudsourced-api";
import { api } from "../../../core/api";
import ProjectCard from "../../ProjectPage/ProjectCard";

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
  project: Project;
  projectName: string;
  id: number;
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
  const [latestProject, setLatestProjects] = useState<
    IRemoteData<projectData, null>
  >(fromLoading());
  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi(
        api.config
      ).getProjectsByUserUsingGET();

      const data: projectData[] = result.map((p, i) => ({
        key: i.toString(),
        number: i,
        project: p,
        projectName: p.name ? p.name : "",
        id: p.id ? p.id : 0,
      }));
      let latestProject: projectData = data[0];

      data.forEach((dataPoint) => {
        if (latestProject) {
          if (latestProject.project.createdAt! > dataPoint.project.createdAt!) {
            latestProject = dataPoint;
          }
        } else {
          latestProject = dataPoint;
        }
      });

      data.find((p) => p.project.updatedAt);
      setProjects(fromLoaded(data));
      setLatestProjects(fromLoaded(latestProject));
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
                  <Title level={4}>Finished projects</Title>
                  <Progress percent={50} status="active" />
                </div>
                <div>
                  <Title level={4}>Finished tasks</Title>
                  <Progress percent={70} status="active" />
                </div>
                <div>
                  <Title level={4}>Finished points</Title>
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
