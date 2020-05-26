import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Col, Row, Spin, Typography } from "antd";
import { Project, ProjectResourceApi } from "cloudsourced-api";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../core/IRemoteData";
import ProjectCard from "./ProjectCard";

interface IProps extends RouteComponentProps {}

const ProjectPage: React.FC<IProps> = (props) => {
  const [projects, setProjects] = useState<IRemoteData<Project[], null>>(
    fromLoading()
  );

  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi().allUsingGET1();
      console.log(result);
      setProjects(fromLoaded(result));
    })();
  }, []);

  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Projecten</Typography.Title>
      </div>
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
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectPage;
