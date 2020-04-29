import React from "react";
import "./index.scss";
import { Card, Avatar } from "antd";
import {
  MoreOutlined,
  HeartFilled,
  ShareAltOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

export interface IProps {
  title: string;
  imageSource: string;
  language: string;
  description: string;
  avatarSource: string;
}

const ProjectCard: React.FC<IProps> = (props) => {
  const { description, imageSource, language, title, avatarSource } = props;

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          style={{ width: "calc(100% - 2px)", height: "175px", margin: "auto" }}
          src={imageSource}
        />
      }
      actions={[
        <HeartFilled key="favorite" />,
        <ShareAltOutlined key="share" />,
        <DownOutlined key="ellipsis" />,
      ]}
      title={title}
      extra={<MoreOutlined />}
    >
      <Meta
        avatar={<Avatar src={avatarSource} />}
        title={language}
        description={description}
      />
    </Card>
  );
};

export default ProjectCard;
