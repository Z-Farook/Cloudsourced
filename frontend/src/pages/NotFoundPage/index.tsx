import React from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Button, Typography } from "antd";
import { RouteComponentProps, withRouter } from "react-router";

interface IProps extends RouteComponentProps {}

const NotFoundPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography.Title>Whoops!</Typography.Title>
        <Typography.Paragraph>This page was not found.</Typography.Paragraph>
        <Button onClick={() => props.history.push("/")}>
          Click here to return to the home page
        </Button>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(NotFoundPage);
