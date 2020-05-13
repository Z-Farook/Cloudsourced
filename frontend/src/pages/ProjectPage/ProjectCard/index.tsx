import React from "react";
import "./index.scss";
import { Card, Avatar } from "antd";
import { MoreOutlined } from "@ant-design/icons";
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
      style={{ width: "100%" }}
      cover={
        <img
          alt="example"
          className="image"
          src={
            imageSource
              ? imageSource
              : "https://source.unsplash.com/400x300/?code,pc"
          }
        />
      }
      // actions={
      //   [
      //     <HeartFilled key="favorite" />,
      //     <ShareAltOutlined key="share" />,
      //     <DownOutlined key="ellipsis" />,
      //   ]
      // }
      title={title}
      extra={<MoreOutlined />}
    >
      <Meta
        avatar={
          <Avatar
            src={
              avatarSource
                ? avatarSource
                : "https://source.unsplash.com/100x100/?person,avatar"
            }
          />
        }
        title={language}
        description={
          description
            ? description
            : "This project has no description ask the project owner for more details."
        }
      />
    </Card>
  );
};

export default ProjectCard;