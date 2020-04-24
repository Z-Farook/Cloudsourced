import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography } from "antd";
import ProjectCard, { IProps as IProjectCardProps } from "./ProjectCard";

interface IProps extends RouteComponentProps {}

const HomePage: React.FC<IProps> = (props) => {
  const mockdata: IProjectCardProps = {
    title: "Project",
    imageSource:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    language: "Typescript",
    description: "project description here.",
  };

  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Home</Typography.Title>
      </div>
      <ProjectCard {...mockdata}></ProjectCard>
    </DefaultLayout>
  );
};

export default HomePage;