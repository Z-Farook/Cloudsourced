import React, { useMemo } from "react";
import { Col, Menu, Row, Typography } from "antd";
import { RouteComponentProps, withRouter } from "react-router";

export enum EMenuItem {
  Home,
  Projects,
  UserProjects,
}

export const menuItemUrls: Record<EMenuItem, string> = {
  [EMenuItem.Home]: "/home",
  [EMenuItem.Projects]: "/projects",
  [EMenuItem.UserProjects]: "/user/projects",
};

export const menuItemTexts: Record<EMenuItem, string> = {
  [EMenuItem.Home]: "Home",
  [EMenuItem.Projects]: "Projects",
  [EMenuItem.UserProjects]: "My Projects",
};

interface IProps extends RouteComponentProps {}

const Header: React.FC<IProps> = (props) => {
  const selectedKeys = useMemo<Array<string>>(() => {
    const menuItem = Object.keys(menuItemUrls).find((menuItemKey) => {
      const key = Number(menuItemKey) as EMenuItem;
      return props.location.pathname.startsWith(menuItemUrls[key]);
    });

    if (menuItem === undefined) {
      return [];
    }

    return [menuItem];
  }, [props.location.pathname]);

  return (
    <Row
      style={{
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <Col
        span={3}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          CloudSourced
        </Typography.Title>
      </Col>
      <Col span={21}>
        <Menu theme="light" mode="horizontal" selectedKeys={selectedKeys}>
          {Object.keys(EMenuItem).map((key) => {
            const enumEntry = Number(key) as EMenuItem;
            return (
              <Menu.Item
                key={key}
                onClick={() => props.history.push(menuItemUrls[enumEntry])}
              >
                {menuItemTexts[enumEntry]}
              </Menu.Item>
            );
          })}
        </Menu>
      </Col>
    </Row>
  );
};

export default withRouter(Header);
