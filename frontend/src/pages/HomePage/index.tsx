import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography } from "antd";
import ProjectCardComponent from "../../components/Projects/ProjectCardComponent";
import { ProjectCard } from "../../interfaces/ProjectCard";

interface IProps extends RouteComponentProps {}

const HomePage: React.FC<IProps> = (props) => {
  const mockdata: ProjectCard = {title: 'Project',
   imageSource:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    language: 'Typescript',
    description: 'project description here.'
  };
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Home</Typography.Title>
      </div>
      <ProjectCardComponent data={mockdata}></ProjectCardComponent>
    </DefaultLayout>
  );
};

export default HomePage;
