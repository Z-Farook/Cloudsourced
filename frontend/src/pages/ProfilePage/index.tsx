import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Row, Col, Spin, Typography, BackTop, Descriptions } from "antd";
import noImage from "../../assets/noimage.png";
import IRemoteData, {
  fromLoaded,
  fromLoading,
  EState,
} from "../../core/IRemoteData";
import {
  ProjectResourceApi,
  UserResourceApi,
  User,
  ProjectDTO,
} from "cloudsourced-api";
import { api } from "../../core/api";
import "./index.scss";
import ProjectCard from "../ProjectPage/ProjectCard";
import { formatUser } from "../../formatters/user";
const { Title } = Typography;

interface IRouterParams {
  id: string;
}

export interface IProps extends RouteComponentProps<IRouterParams> {}

const ProfilePage: React.FC<IProps> = (props) => {
  const [user, setUser] = useState<IRemoteData<User, null>>(fromLoading());
  const [projects, setProjects] = useState<IRemoteData<ProjectDTO[], null>>(
    fromLoading()
  );
  useEffect(() => {
    (async () => {
      const result = await new UserResourceApi(
        api.config
      ).getUserProfileInfoUsingGET({ id: Number(props.match.params.id) });
      setUser(fromLoaded(result));
    })();
  }, [props.match.params.id]);

  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi(
        api.config
      ).getProjectsByUserIdUsingGET({ id: Number(props.match.params.id) });

      setProjects(fromLoaded(result));
    })();
  }, [props.match.params.id]);

  return (
    <DefaultLayout>
      {user.state === EState.Loading ? (
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
                minHeight: "calc(100vh - (46px) - 20em)",
                padding: "20px 60px",
              }}
            >
              <Row className="project-info">
                <Col span={8}>
                  <img alt="example" className="detailImage" src={noImage} />
                </Col>
                <Col span={12}>
                  <Title level={2}>{formatUser(user.data!)}</Title>
                  <Descriptions>
                    <Descriptions.Item span={16} label="Country">
                      {user.data?.country}
                    </Descriptions.Item>
                    <Descriptions.Item span={16} label="Email">
                      {user.data?.email}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Title level={2}>Projects</Title>
              {projects.state === EState.Loading ? (
                <Spin />
              ) : (
                <div className="Grid" style={{ padding: 20 }}>
                  <Row justify="center" gutter={[24, 24]}>
                    {projects.data!.map((v, i) => {
                      return (
                        <Col xl={5} lg={6} md={8} sm={12} xs={24} key={i}>
                          <ProjectCard project={v} />
                        </Col>
                      );
                    })}
                    <BackTop />
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProfilePage;
