import React from "react";
import Header from "../Header";
// import Footer from "../Footer";

import { Layout } from "antd";

interface IProps {}

const DefaultLayout: React.FC<IProps> = (props) => {
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "100vh",
      }}
    >
      <Header />
      <Layout.Content
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {props.children}
      </Layout.Content>
      {/* <Footer /> */}
    </Layout>
  );
};

export default DefaultLayout;
