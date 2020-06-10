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
  const [key, setKey] = useState("2");
  const handleMenuClick = (e: any) => {
    setKey(e.key);
  };
  enum menu {
    Dashboard,
    Projects,
    Details,
  }
  const renderSwitch = (key: number) => {
    switch (key) {
      case menu.Dashboard:
        return <Dashboard />;
      case menu.Projects:
        return <MyProjects />;
      case menu.Details:
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
              defaultSelectedKeys={[menu.Dashboard.toString()]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <Menu.Item key={menu.Dashboard}>Dashboard</Menu.Item>
              <Menu.Item key={menu.Projects}>Projects</Menu.Item>
              <Menu.Item key={4}>Transactions</Menu.Item>
              <Menu.Item key={menu.Details}>
                <span>
                  <SettingOutlined />
                  <span>Settings</span>
                </span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>{renderSwitch(Number(key))}</Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(AccountPage);
