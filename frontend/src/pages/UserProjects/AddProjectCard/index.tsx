import React, { ComponentProps } from "react";
import { Card, Avatar } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { withRouter, RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps {}

const AddProjectCard: React.FC<IProps> = (props) => {
  return (
    <Card
      style={{ width: "100%" }}
      cover={
        <img
          alt="example"
          className="image"
          src={" https://image.flaticon.com/icons/svg/2095/2095908.svg"}
        />
      }
      actions={[
        <PlusOutlined
          key="ellipsis"
          onClick={() => props.history.push("/user/project/create")}
        />,
      ]}
      title={"Nieuw project"}
      extra={<MoreOutlined />}
    >
      <Meta
        avatar={
          <Avatar
            src={" https://image.flaticon.com/icons/svg/1077/1077063.svg"}
          />
        }
        title={"Nieuw project"}
        description={"Nieuw project"}
      />
    </Card>
  );
};

export default withRouter(AddProjectCard);
