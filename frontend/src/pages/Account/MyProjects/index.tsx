import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Button, PageHeader, BackTop } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Row, Spin, Typography } from "antd";
import { Project, ProjectResourceApi } from "cloudsourced-api";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../../core/IRemoteData";
import ProjectCard from "../../ProjectPage/ProjectCard/";

interface IProps extends RouteComponentProps {}
interface IProps extends RouteComponentProps {}

const MyProjects: React.FC<IProps> = (props) => {
  const [projects, setProjects] = useState<IRemoteData<Project[], null>>(
    fromLoading()
  );

  useEffect(() => {
    (async () => {
      //TODO
      // get projects from current user
      const result = await new ProjectResourceApi().allUsingGET1();
      console.log(result);
      setProjects(fromLoaded(result));
    })();
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
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
      />
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
    </div>
  );
};

export default withRouter(MyProjects);
