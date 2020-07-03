import React, { useState, useEffect, useContext, useMemo } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import {
  Row,
  Col,
  Spin,
  Button,
  Typography,
  Tooltip,
  PageHeader,
  Popconfirm,
  message,
} from "antd";
import noImage from "../../assets/noimage.png";
import FeatureCard from "../../components/feature/FeatureCard";
import IRemoteData, {
  fromLoaded,
  fromLoading,
  EState,
} from "../../core/IRemoteData";
import { ProjectDetailDTO, ProjectResourceApi } from "cloudsourced-api";
import { api } from "../../core/api";
import AuthStore from "../../stores/AuthStore";
import "./index.scss";
import {
  EditOutlined,
  CheckOutlined,
  ExclamationOutlined,
  CheckCircleTwoTone,
  FileExclamationTwoTone,
  FileExclamationOutlined,
} from "@ant-design/icons";
import DataContext from "../../core/DataContext";
const { Title, Text, Paragraph } = Typography;

interface IRouterParams {
  projectId: string;
}

export interface IProps extends RouteComponentProps<IRouterParams> {}
const ProjectDetailPage: React.FC<IProps> = (props) => {
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), []);

  const projectId = Number(props.match.params.projectId);

  const [project, setProject] = useState<IRemoteData<ProjectDetailDTO, null>>(
    fromLoading()
  );

  const [isOwner, setIsOwner] = useState<boolean>(false);

  const { auth } = AuthStore.useContainer();

  useEffect(() => {
    (async () => {
      if (auth?.userId === project.data?.user?.id) {
        setIsOwner(true);
      }
    })();
  });

  const finishProject = async () => {
    try {
      await new ProjectResourceApi(api.config).finishProjectUsingPOST({
        projectId,
      });
      successMessage();
      props.history.push("/account");
    } catch (error) {
      errorMessage();
    }
  };

  const archiveProject = async () => {
    try {
      await new ProjectResourceApi(api.config).archiveProjectUsingPOST({
        projectId,
      });
      successMessage();
      props.history.push("/account");
    } catch (error) {
      errorMessage();
    }
  };

  const successMessage = () => {
    message.success({
      content: "Project is updated succesfully!",
      key: "updatableKey",
      duration: 2,
    });
  };

  const errorMessage = () => {
    message.error({
      content: "Something went wrong",
      key: "updatableKey",
      duration: 2,
    });
  };

  useEffect(() => {
    (async () => {
      const result = await dataContext.project.getProjectDetail({ projectId });
      setProject(fromLoaded(result.project));
    })();
  }, []);

  const {
    description,
    image,
    name: projectName,
    user,
    finishedAt,
    archivedAt,
  } = project.data || {};

  return (
    <DefaultLayout>
      {project.state === EState.Loading ? (
        <Spin />
      ) : (
        <div
          style={{
            padding: 0,
            backgroundColor: "#eaeaea",
          }}
        >
          <Row style={{ margin: "10em" }}>
            <Col
              span={24}
              style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 46px - 20em)",
                padding: "20px 60px",
              }}
            >
              <Row gutter={[0, 20]}>
                <Col span={24}>
                  <PageHeader
                    style={{ fontSize: 38, paddingLeft: 0, paddingRight: 0 }}
                    title={projectName}
                    extra={
                      isOwner
                        ? [
                            <Tooltip key="edit" title="Edit this project">
                              <EditOutlined
                                style={{ fontSize: 30 }}
                                onClick={() =>
                                  props.history.push(
                                    `/projects/${projectId}/edit`
                                  )
                                }
                              />
                            </Tooltip>,
                            finishedAt ? (
                              <Tooltip
                                key="isfinish"
                                title="This project is finished"
                              >
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                              </Tooltip>
                            ) : (
                              <Tooltip key="finish" title="Finish project">
                                <Popconfirm
                                  title="Do you want to finish this project?"
                                  okText="Yes"
                                  cancelText="No"
                                  placement="bottom"
                                  icon={
                                    <ExclamationOutlined
                                      style={{ color: "red" }}
                                    />
                                  }
                                  onConfirm={() => finishProject()}
                                >
                                  <CheckOutlined />
                                </Popconfirm>
                              </Tooltip>
                            ),
                            archivedAt ? (
                              <Tooltip
                                key="isfinish"
                                title="This project is archived"
                              >
                                <FileExclamationTwoTone twoToneColor="red" />
                              </Tooltip>
                            ) : (
                              <Tooltip key="archive" title="Archive project">
                                <Popconfirm
                                  title="Do you want to archive this project?"
                                  okText="Yes"
                                  cancelText="No"
                                  placement="bottom"
                                  icon={
                                    <ExclamationOutlined
                                      style={{ color: "red" }}
                                    />
                                  }
                                  onConfirm={() => archiveProject()}
                                >
                                  <FileExclamationOutlined />
                                </Popconfirm>
                              </Tooltip>
                            ),
                          ]
                        : ""
                    }
                  />
                  <Text className="subtitle">
                    By{" "}
                    <span
                      onClick={() => props.history.push("/user/" + user?.id)}
                    >
                      {user?.name}
                    </span>
                  </Text>
                </Col>
              </Row>
              <Row gutter={[20, 0]} className="project-info">
                <Col span={8}>
                  <img
                    alt="example"
                    className="detailImage"
                    src={image ? image : noImage}
                  />
                </Col>
                <Col span={12}>
                  <Title level={2}>Description</Title>
                  <Paragraph>{description}</Paragraph>
                </Col>
              </Row>
              {project.data!.features!.length > 0 ? (
                <Title level={2}>Features</Title>
              ) : (
                ""
              )}
              {project.data!.features!.map((v, i) => {
                return (
                  <FeatureCard
                    key={i}
                    {...{ data: v, projectId }}
                  ></FeatureCard>
                );
              })}
              {isOwner ? (
                <Button
                  onClick={() =>
                    props.history.push(`/projects/${projectId}/feature/add`)
                  }
                >
                  Create feature
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
