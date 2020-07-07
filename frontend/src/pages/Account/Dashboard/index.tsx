import React, { useState, useEffect, useContext, useMemo } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Row, Col, Table, Card, Statistic, Progress, Button } from "antd";

import {
  DollarOutlined,
  PlusOutlined,
  RightOutlined,
  ApiOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import IRemoteData, {
  fromLoading,
  fromLoaded,
} from "../../../core/IRemoteData";
import { ProjectDTO, FeatureDTO } from "cloudsourced-api";
import { api } from "../../../core/api";
import ProjectCard from "../../ProjectPage/ProjectCard";
import DataContext from "../../../core/DataContext";

interface IProps extends RouteComponentProps {}
const now = new Date();

const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
const monthDay = now.getDate();
const mondayThisWeek = monthDay - weekDay;
const startOfThisWeek = new Date(+now);
startOfThisWeek.setDate(mondayThisWeek);
startOfThisWeek.setHours(0, 0, 0, 0);

const columnsTransactions = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Points",
    dataIndex: "points",
    key: "points",
  },
];
interface projectData {
  key: string;
  number: number;
  project: ProjectDTO;
  projectName: string;
  id: number;
  finishedAt?: Date;
}
interface featureData {
  key: string;
  number: number;
  feature: FeatureDTO;
  featureName: string;
  id: number;
  finishedAt?: Date;
  ids: { id: number; projectId: number };
}
interface UserTransaction {
  id?: number;
  points?: number;
}

const Dashboard: React.FC<IProps> = (props) => {
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);
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
  const columnsTasks = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Current Features",
      dataIndex: "featureName",
      key: "feature",
    },
    {
      title: "",
      dataIndex: "ids",
      key: "ids",
      render: (ids: { id: number; projectId: number }) => (
        <Button
          shape="circle"
          onClick={() =>
            props.history.push(
              "/projects/" +
                ids.projectId.toString() +
                "/features/" +
                ids.id.toString()
            )
          }
        >
          <RightOutlined />
        </Button>
      ),
    },
  ];
  const [projects, setProjects] = useState<IRemoteData<projectData[], null>>(
    fromLoading()
  );
  const [features, setFeatures] = useState<IRemoteData<FeatureDTO[], null>>(
    fromLoading()
  );
  const [transactions, setTransactions] = useState<
    IRemoteData<UserTransaction[], null>
  >(fromLoading());
  const [points, setPoints] = useState<IRemoteData<number, 0>>(fromLoading());
  const [latestProject, setLatestProjects] = useState<
    IRemoteData<projectData, null>
  >(fromLoading());
  const [projectsFinished, setProjectsFinished] = useState<number>(0);
  const [featuresFinished, setFeaturesFinished] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await dataContext.project.getProjectsByAuthenticatedUser();
      const userTransactionData = await dataContext.transaction.getTransactionsByAuthenticatedUser();
      const userFeatureData = await dataContext.feature.getFeaturesByUser();
      const data: projectData[] = result.map((p, i) => ({
        key: i.toString(),
        number: i,
        project: p,
        projectName: p.name ? p.name : "",
        id: p.id ? p.id : 0,
        finishedAt: p.finishedAt ? p.finishedAt : undefined,
      }));

      data.sort((a, b) => {
        return b.project.createdAt!.getTime() - a.project.createdAt!.getTime();
      });
      setProjects(fromLoaded(data));

      const featureData: featureData[] = userFeatureData.map((p, i) => ({
        key: i.toString(),
        number: i,
        feature: p,
        featureName: p.name ? p.name : "",
        id: p.id ? p.id : 0,
        ids: {
          id: p.id ? p.id : 0,
          projectId: p.project?.id ? p.project.id : 0,
        },
        finishedAt: p.finishedAt ? p.finishedAt : undefined,
      }));
      featureData.sort((a, b) => {
        return b.feature.createdAt!.getTime() - a.feature.createdAt!.getTime();
      });
      setFeatures(fromLoaded(featureData));

      const userTransactions: UserTransaction[] = userTransactionData.map(
        (p, i) => ({
          key: i.toString(),
          id: p.id,
          points: p.points,
        })
      );
      setTransactions(fromLoaded(userTransactions));
      let points =
        userTransactions !== null
          ? (userTransactions
              .map((a) => a.points)
              .reduce((a, b) => a! + b!, 0) as number)
          : 0;

      setProjectsFinished(
        Math.floor(
          (data.filter((p, i) =>
            p.finishedAt !== undefined && p.project.archivedAt === undefined
              ? p
              : undefined
          ).length /
            data.filter((p, i) =>
              p.project.archivedAt === undefined ? p : undefined
            ).length) *
            100
        )
      );
      setFeaturesFinished(
        Math.floor(
          (userFeatureData.filter((p, i) =>
            p.finishedAt !== undefined && p.archivedAt === undefined
              ? p
              : undefined
          ).length /
            userFeatureData.filter((p, i) =>
              p.archivedAt === undefined ? p : undefined
            ).length) *
            100
        )
      );

      setPoints(fromLoaded(points));
      setLatestProjects(fromLoaded(data[0]));
    })();
  }, [dataContext.project, dataContext.transaction, dataContext.feature]);
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
                  prefix={<ClusterOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Features this week"
                  value={
                    features.data?.filter((p) => p.createdAt! > startOfThisWeek)
                      .length
                  }
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ApiOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Your points"
                  value={points.data ? (points.data as number) : 0}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<DollarOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
          </Row>
          <Row justify="center" gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <Title style={{marginBottom: "1.2em"}}>Progress</Title>

                <div style={{marginBottom: "2em"}}>
                  <Title level={4}>Finished projects</Title>
                  <Progress
                    percent={projects.data ? projectsFinished : 0}
                    status={
                      (projects.data ? projectsFinished : 0) === 100
                        ? "success"
                        : "active"
                    }
                  />
                </div>
                <div style={{marginBottom: "2em"}}>
                  <Title level={4}>Finished features</Title>
                  <Progress
                    percent={features.data ? featuresFinished : 0}
                    status={
                      (features.data ? featuresFinished : 0) === 100
                        ? "success"
                        : "active"
                    }
                  />
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
              dataSource={projects.data ? projects.data.slice(0,3) : []}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Table
              pagination={false}
              dataSource={features.data ? features.data.slice(0,3) : []}
              columns={columnsTasks}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Table
              pagination={false}
              dataSource={transactions.data !== null ? transactions.data.slice(0,3) : []}
              columns={columnsTransactions}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Dashboard);
