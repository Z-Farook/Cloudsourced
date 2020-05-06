import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Row, Col, PageHeader } from "antd";
import ProjectCard from "../ProjectPage/ProjectCard";
import { projectMocks } from "../ProjectPage/projectMocks";
interface IProps extends RouteComponentProps {}

const ProjectPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <PageHeader className="site-page-header" title="Projects"></PageHeader>
      <div className="Grid" style={{ padding: 20 }}>
        <Row justify="center" gutter={[24, 24]}>
          {projectMocks.map((v, i) => {
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

export default ProjectPage;
