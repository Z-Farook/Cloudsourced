import React from "react";
import Header from "../Header";
import Footer from "../Footer";

import { Layout } from "antd";

interface IProps {}

const DefaultLayout: React.FC<IProps> = (props) => {
  return (
    <Layout>
      <Header />
      <Layout.Content
        style={{ backgroundColor: "white"}}
      >
        {props.children}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
