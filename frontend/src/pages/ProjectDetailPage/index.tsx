import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography, Row, Col, Divider, Spin, Button } from "antd";

import FeatureCard from "../../components/feature/FeatureCard";
import IRemoteData, {
  fromLoaded,
  fromLoading,
  EState,
} from "../../core/IRemoteData";
import { Project, ProjectResourceApi } from "cloudsourced-api";
import { api } from "../../core/api";

interface IRouterParams {
  projectId: string;
}

export interface IProps extends RouteComponentProps<IRouterParams> {}

const ProjectDetailPage: React.FC<IProps> = (props) => {
  const projectId = Number(props.match.params.projectId);

  const [project, setProject] = useState<IRemoteData<Project, null>>(
    fromLoading()
  );

  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi(
        api.config
      ).getOneByIdUsingGET2({
        id: projectId,
      });
      setProject(fromLoaded(result));
    })();
  }, [projectId]);

  const { description, image, name: projectName } = project.data || {};

  return (
    <DefaultLayout>
      {project.state === EState.Loading ? (
        <Spin />
      ) : (
        <div style={{ padding: 20 }}>
          <Typography.Title>{projectName}</Typography.Title>
          <Row>
            <Col span={12} offset={6}>
              <Row>
                <Col span={12}>
                  <img
                    alt="example"
                    className="image"
                    src={
                      image
                        ? image
                        : "https://source.unsplash.com/400x300/?code,pc"
                    }
                  />
                </Col>
                <Col span={12}>
                  <Divider
                    orientation="left"
                    style={{ color: "#333", fontWeight: "normal" }}
                  >
                    Description
                  </Divider>
                  {description}
                </Col>
              </Row>

              {project.data!.features!.length > 0 ? (
                <Divider
                  orientation="left"
                  style={{ color: "#333", fontWeight: "normal" }}
                >
                  Features
                </Divider>
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

              <Button
                onClick={() =>
                  props.history.push(`/projects/${projectId}/feature/add`)
                }
              >
                Create feature
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
