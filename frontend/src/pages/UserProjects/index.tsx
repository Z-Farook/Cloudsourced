import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Row, Col, Button, PageHeader } from "antd";
import ProjectCard from "../ProjectPage/ProjectCard";
import { myProjectMocks } from "./myProjectMocks";
import { PlusOutlined } from "@ant-design/icons";
interface IProps extends RouteComponentProps {}

const UserProjectsPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <PageHeader
        className="site-page-header"
        title="My projects"
        extra={[
          <Button
            type="primary"
            shape="circle"
            onClick={() => props.history.push("/user/project/create")}
          >
            <PlusOutlined />
          </Button>,
        ]}
      ></PageHeader>
      <div className="Grid" style={{ padding: 20 }}>
        <Row justify="center" gutter={[24, 24]}>
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

export default withRouter(UserProjectsPage);
