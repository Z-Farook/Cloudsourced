import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography } from "antd";
import ProjectCardComponent from "../../components/Projects/ProjectCardComponent";

interface IProps extends RouteComponentProps {}

const HomePage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Home</Typography.Title>
      </div>
      <ProjectCardComponent></ProjectCardComponent>
    </DefaultLayout>
  );
};

export default HomePage;
