import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Row, PageHeader, Menu, Col } from "antd";

import { SettingOutlined } from "@ant-design/icons";

import Dashboard from "./Dashboard";
import MyProjects from "./MyProjects";
import AccountDetails from "./AccountDetails";

interface IProps extends RouteComponentProps {}

const AccountPage: React.FC<IProps> = (props) => {
  const [key, setKey] = useState("1");
  const handleMenuClick = (e: any) => {
    setKey(e.key);
  };
  const renderSwitch = (key: string) => {
    switch (key) {
      case "1":
        return <Dashboard />;
      case "2":
        return <MyProjects />;
      case "4":
        return <AccountDetails />;
      default:
        return "Not created yet";
    }
  };
  return (
    <DefaultLayout>
      <PageHeader className="site-page-header" title="My account" />
      <div className="Grid" style={{ padding: 20 }}>
        <Row>
          <Col span={4}>
            <Menu
              onClick={handleMenuClick}
              style={{ width: 256, height: "100%" }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <Menu.Item key="1">Dashboard</Menu.Item>
              <Menu.Item key="2">Projects</Menu.Item>
              <Menu.Item key="3">Transactions</Menu.Item>
              <Menu.Item key="4">
                <span>
                  <SettingOutlined />
                  <span>Settings</span>
                </span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>{renderSwitch(key)}</Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(AccountPage);
