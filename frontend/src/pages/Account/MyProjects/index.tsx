import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface IProps extends RouteComponentProps {}

const MyProjects: React.FC<IProps> = (props) => {
  return (
    <>
      <Button
        type="primary"
        shape="circle"
        onClick={() => props.history.push("/user/project/create")}
      >
        <PlusOutlined />
      </Button>
    </>
  );
};

export default withRouter(MyProjects);
