import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Col, Row, Spin, Typography, Select, PageHeader } from "antd";
import { Project, ProjectResourceApi } from "cloudsourced-api";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../core/IRemoteData";

import ProjectCard from "./ProjectCard";
import { api } from "../../core/api";

interface IProps extends RouteComponentProps {}

const ProjectPage: React.FC<IProps> = (props) => {
  const [projects, setProjects] = useState<IRemoteData<Project[], null>>(
    fromLoading()
  );
  const sort = (value: string) => {
    if (value === "Ascending") {
      setProjects(
        fromLoaded(
          projects.data!.sort((a, b) => {
            return a.createdAt!.getTime() - b.createdAt!.getTime();
          })
        )
      );
    } else {
      setProjects(
        fromLoaded(
          projects.data!.sort((a, b) => {
            return b.createdAt!.getTime() - a.createdAt!.getTime();
          })
        )
      );
    }
  };
  const { Option } = Select;
  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi(api.config).allUsingGET2();
      console.log(result);
      setProjects(fromLoaded(result));
    })();
  }, []);

  return (
    <DefaultLayout>
      <PageHeader
        className="site-page-header"
        title="Projects"
        extra={[
          <Select
            defaultValue="Ascending"
            style={{ width: 120 }}
            onChange={sort}
          >
            <Option value="Ascending">Ascending</Option>
            <Option value="Descending">Descending</Option>
          </Select>,
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
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectPage;
