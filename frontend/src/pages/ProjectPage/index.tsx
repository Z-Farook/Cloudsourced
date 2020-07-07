import React, { useEffect, useState, useContext, useMemo } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Col, Row, Spin, Select, PageHeader } from "antd";
import { ProjectDTO } from "cloudsourced-api";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../core/IRemoteData";

import ProjectCard from "./ProjectCard";
import { api } from "../../core/api";
import DataContext from "../../core/DataContext";

interface IProps extends RouteComponentProps {}

const ProjectPage: React.FC<IProps> = (props) => {
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);
  const [projects, setProjects] = useState<IRemoteData<ProjectDTO[], null>>(
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
      const result = await dataContext.project.getAllProjects();
      setProjects(fromLoaded(result.projects));
    })();
  }, []);

  return (
    <DefaultLayout>
      <PageHeader
        className="site-page-header"
        title="Projects"
        extra={[
          <Select
            key="select"
            defaultValue="Ascending"
            style={{ width: 120 }}
            onChange={sort}
          >
            <Option key="asc" value="Ascending">
              Ascending
            </Option>
            <Option key="desc" value="Descending">
              Descending
            </Option>
          </Select>,
        ]}
      />
      {projects.state === EState.Loading ? (
        <Spin />
      ) : projects.state === EState.Error ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Something went wrong.
        </div>
      ) : projects.data!.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          There are no projects available.
        </div>
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
