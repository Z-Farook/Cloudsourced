import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Row, Button, PageHeader, Menu, Col } from "antd";

import { PlusOutlined, SettingOutlined } from "@ant-design/icons";

import Dashboard from "./Dashboard";

interface IProps extends RouteComponentProps {}

const AccountPage: React.FC<IProps> = (props) => {
  const [menu, setMenuState] = useState<"1">();
  const handleMenuClick = (e: any) => {
    setMenuState(e.key);
  };
  return (
    <DefaultLayout>
      <PageHeader
        className="site-page-header"
        title="My account"
        extra={[
          <Button
            type="primary"
            shape="circle"
            onClick={() => props.history.push("/user/project/create")}
          >
            <PlusOutlined />
          </Button>,
        ]}
      />
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

              <Menu.Item key="4">Developers</Menu.Item>
              <Menu.Item key="5">
                <span>
                  <SettingOutlined />
                  <span>Settings</span>
                </span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
          { menu.state == "1" ? <Dashboard /> : }
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(AccountPage);
