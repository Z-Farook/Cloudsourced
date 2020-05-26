import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography, Row, Col, Divider, Spin } from "antd";

import FeatureCard from "../../components/feature/FeatureCard";
import IRemoteData, {
  fromLoaded,
  fromLoading,
  EState,
} from "../../core/IRemoteData";
import {
  Project,
  ProjectResourceApi,
  GetOneByIdUsingGET1Request,
} from "cloudsourced-api";

interface IRouterParams {
  projectId: string;
}

export interface IProps extends RouteComponentProps<IRouterParams> {
  title: string;
  imageSource: string;
  language: string;
  description: string;
  avatarSource: string;
}

interface IFeature extends RouteComponentProps {
  name: string;
  points: number;
  description: string;
  codeLanguage: string;
  codePreview: string;
}

const ProjectDetailPage: React.FC<IProps> = (props) => {
  let projectName, description, image;
  const projectId = parseInt(props.match.params.projectId);

  const projectIdRequest: GetOneByIdUsingGET1Request = { id: projectId };

  const [project, setProject] = useState<IRemoteData<Project, null>>(
    fromLoading()
  );

  useEffect(() => {
    (async () => {
      const result = await new ProjectResourceApi().getOneByIdUsingGET1(
        projectIdRequest
      );
      console.log(result);
      setProject(fromLoaded(result));
    })();
  }, []);

  if (project.state === EState.Loaded) {
    description = project.data!.description;
    image = project.data!.image;
    projectName = project.data!.name;
  }

  // TODO: make pretty
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

              {/* TODO: map through project features */}
              <Divider
                orientation="left"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Features
              </Divider>
              <FeatureCard {...props}></FeatureCard>
            </Col>
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
