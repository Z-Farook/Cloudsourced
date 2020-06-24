import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import {
  Row,
  Col,
  Divider,
  Spin,
  Button,
  Card,
  Typography,
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
const { Title, Text, Paragraph } = Typography;

interface IRouterParams {
  id: string;
}

export interface IProps extends RouteComponentProps<IRouterParams> {}

const ProfilePage: React.FC<IProps> = (props) => {
  const { auth } = AuthStore.useContainer();
  console.log(auth);
  const userId = auth?.userId;
  const projectId = Number(props.match.params.id);

  const [project, setProject] = useState<IRemoteData<ProjectDetailDTO, null>>(
    fromLoading()
  );

  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi(
        api.config
      ).getProjectDetailByIdUsingGET({
        id: projectId,
      });
      console.log(result);
      if (userId === result.user?.id) {
        setIsOwner(true);
      }
      setProject(fromLoaded(result));
    })();
  }, [projectId]);

  const { description, image, name: projectName, user } = project.data || {};

  return (
    <DefaultLayout>
      {project.state === EState.Loading ? (
        <Spin />
      ) : (
        <div
          style={{
            padding: 0,
            backgroundColor: "#eaeaea",
            minHeight: "calc(100vh - 46px)",
          }}
        >
          <Row style={{ margin: "5em" }}>
            <Col
              span={24}
              style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - (46px))",
                padding: "20px 60px",
              }}
            >
              <Row gutter={[0, 20]}>
                <Col span={24}>
                  <Title>{projectName}</Title>
                  <Text className="subtitle">
                    By{" "}
                    <span onClick={() => message.info("TODO: go to user")}>
                      {user?.name}
                    </span>
                  </Text>
                </Col>
              </Row>
              <Row className="project-info">
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

export default ProfilePage;
