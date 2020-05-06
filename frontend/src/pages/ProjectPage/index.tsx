import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography, Row, Col } from "antd";
import ProjectCard from "../ProjectPage/ProjectCard";
import { projectMocks } from "../ProjectPage/projectMocks";
import "./index.scss";
interface IProps extends RouteComponentProps {}

const ProjectPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Projecten</Typography.Title>
      </div>
      <div className="Grid">
        <Row justify="center" gutter={[24, 24]}>
          {projectMocks.map((v, i) => {
            return (
              <Col key={i}>
                <ProjectCard {...v}></ProjectCard>
              </Col>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default ProjectPage;
