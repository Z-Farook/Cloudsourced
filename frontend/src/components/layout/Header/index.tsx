import React, { useMemo } from "react";
import { Menu, Spin, Typography } from "antd";
import { RouteComponentProps, withRouter } from "react-router";
import { DownOutlined } from "@ant-design/icons";
import AuthStore from "../../../stores/AuthStore";
import { formatUser } from "../../../formatters/user";

export enum EMenuItem {
  Home,
  Projects,
}

export const menuItemUrls: Record<EMenuItem, string> = {
  [EMenuItem.Home]: "/home",
  [EMenuItem.Projects]: "/projects",
};

export const menuItemTexts: Record<EMenuItem, string> = {
  [EMenuItem.Home]: "Home",
  [EMenuItem.Projects]: "Projects",
};

interface IProps extends RouteComponentProps {}

const Header: React.FC<IProps> = (props) => {
  const { auth, setAuth, setUser, user } = AuthStore.useContainer();

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 10,
        backgroundColor: "#001529",
      }}
    >
      {/*<Layout.Header style={{ display: "flex", alignItems: "center" }}>*/}
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.history.push("/home");
        }}
      >
        <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
          CloudSourced
        </Typography.Title>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ marginLeft: 30, display: "flex", width: "100%" }}
        selectedKeys={selectedKeys}
      >
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
        <div style={{ flex: 1 }} />
        {auth === null ? (
          <Menu.SubMenu
            title={
              <span style={{ display: "flex", alignItems: "center" }}>
                <span>Account</span>
                <span style={{ marginLeft: 5 }}>
                  <DownOutlined />
                </span>
              </span>
            }
          >
            <Menu.Item onClick={() => props.history.push("/auth/login")}>
              Login
            </Menu.Item>
            <Menu.Item onClick={() => props.history.push("/auth/register")}>
              Register
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.SubMenu
            title={
              <span style={{ display: "flex", alignItems: "center" }}>
                <span>{user === null ? <Spin /> : formatUser(user!)}</span>
                <span style={{ marginLeft: 5 }}>
                  <DownOutlined />
                </span>
              </span>
            }
          >
            <Menu.Item onClick={() => props.history.push("/account")}>
              My Account
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                props.history.push("/home");
                setAuth(null);
                setUser(null);
              }}
            >
              Log out
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
      {/*</Layout.Header>*/}
    </div>
  );
};

export default withRouter(Header);
