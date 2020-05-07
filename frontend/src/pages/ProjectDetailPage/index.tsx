import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography, Row, Col, Divider } from "antd";

import { projectMocks } from "../ProjectPage/projectMocks";
import FeatureCard from "../../components/feature/FeatureCard";
import { IMockFeature } from "../ProjectPage/FeaturePage";

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

const ProjectDetailPage: React.FC<IProps> = (props) => {
  const projectId = parseInt(props.match.params.projectId);
  const { title, description, imageSource } = projectMocks[projectId];

  const data = {
    name: "Basic login form",
    points: 100,
    description:
      "We want a login form that takes an email and a password, with validation and the ability to submit the form.",
    codeLanguage: "tsx",
    codePreview: `interface IProps {
        // These fields can be filled so they need to be used as default values
        emailAddress?: string;
        password?: string;
        onSubmit: (emailAddress: string, password: String) => Promise<void>;
      }
      
      const LoginForm: React.FC<IProps> = (props) => {
        return (
            // Please implement
        );
      };`,
  };

  // TODO: make pretty 
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>{title}</Typography.Title>
        <Row>
          <Col span={12} offset={6}>
            <Row>
              <Col span={12}>
                <img
                  alt="example"
                  className="image"
                  src={
                    imageSource
                      ? imageSource
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
            <FeatureCard {...data}></FeatureCard>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
