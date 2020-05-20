import React from "react";
import "./index.scss";
import { Card, Avatar } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { Project } from "cloudsourced-api";

export interface IProps {
  project: Project;
}

const ProjectCard: React.FC<IProps> = (props) => {
  const { project } = props;
  const { description, image, name } = project;

  return (
    <Link to="/projects/1">
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
    </Link>

  );
};

export default ProjectCard;
