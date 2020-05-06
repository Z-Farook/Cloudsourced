import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { PageHeader } from "antd";

interface IProps extends RouteComponentProps {}

const HomePage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <PageHeader className="site-page-header" title="Home"></PageHeader>
    </DefaultLayout>
  );
};

export default HomePage;
