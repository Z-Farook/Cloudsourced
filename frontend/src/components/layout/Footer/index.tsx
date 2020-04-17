import React from "react";
import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

interface IProps {}

const Footer: React.FC<IProps> = (props) => {
  return (
    <AntdFooter
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      footer
    </AntdFooter>
  );
};

export default Footer;
