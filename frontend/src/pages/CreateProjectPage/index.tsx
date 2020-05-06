import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Typography } from "antd";

interface IProps extends RouteComponentProps {}

const CreateProjectPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <div style={{ padding: 20 }}>
        <Typography.Title>Maak een nieuw project aan</Typography.Title>
      </div>
    </DefaultLayout>
  );
};

export default CreateProjectPage;
