import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography, Row, Col } from "antd";
import ProjectCard from "../ProjectPage/ProjectCard";
import { myProjectMocks } from "./myProjectMocks";
import AddProjectCard from "./AddProjectCard";
interface IProps extends RouteComponentProps {}

const UserProjectsPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Mijn Projecten</Typography.Title>
      </div>
      <div className="Grid" style={{ padding: 20 }}>
        <Row justify="center" gutter={[24, 24]}>
          <Col xl={5} lg={6} md={8} sm={12} xs={24} key={0}>
            <AddProjectCard></AddProjectCard>
          </Col>
          {myProjectMocks.map((v, i) => {
            return (
              <Col xl={5} lg={6} md={8} sm={12} xs={24} key={i}>
                <ProjectCard {...v}></ProjectCard>
              </Col>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default UserProjectsPage;
