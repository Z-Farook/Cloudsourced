import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography, Row, Col, Divider } from "antd";

import { projectMock } from "./projectMock";

export interface IProps extends RouteComponentProps {
  title: string;
  imageSource: string;
  language: string;
  description: string;
  avatarSource: string;
  points: number;
}

const ProjectDetailPage: React.FC<IProps> = (props) => {
  const { title, description, imageSource, points } = projectMock;
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>{title}</Typography.Title>
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
          <Col span={12}>Points to earn: {points}!</Col>
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Description
        </Divider>
        <Row>
          <Col span={24}>{description}</Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
