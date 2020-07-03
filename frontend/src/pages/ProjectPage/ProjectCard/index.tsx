import React from "react";
import "./index.scss";
import { Card, Avatar, Tooltip } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { ProjectDTO } from "cloudsourced-api";
import noImage from "../../../assets/noimage.png";
export interface IProps {
  project: ProjectDTO;
}

const ProjectCard: React.FC<IProps> = (props) => {
  const { project } = props;
  const { description, image, name, id, finishedAt } = project;

  const FinishedPrompt = () => {
    return (
      <Tooltip title="This project is finished">
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </Tooltip>
    );
  };

  return (
    <Link to={`/projects/${id}`}>
      <Card
        style={{ width: "100%" }}
        cover={
          <img alt="example" className="image" src={image ? image : noImage} />
        }
        // actions={
        //   [
        //     <HeartFilled key="favorite" />,
        //     <ShareAltOutlined key="share" />,
        //     <DownOutlined key="ellipsis" />,
        //   ]
        // }
        title={name}
        extra={finishedAt ? <FinishedPrompt /> : ""}
      >
        <Meta
          avatar={
            <Avatar
              src={"https://source.unsplash.com/100x100/?person,avatar"}
            />
          }
          title={name ? name : "This project has no name"}
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
