import React from "react";


import { Card, Avatar } from "antd";
import {MoreOutlined, HeartFilled, ShareAltOutlined, DownOutlined} from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";
import { ProjectCard } from "../../interfaces/ProjectCard";
interface IProps {data:ProjectCard}

const ProjectCardComponent: React.FC<IProps> = (props: {data: ProjectCard}) => {

  return (
 <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={props.data.imageSource}
      />
    }
    actions={[
      <HeartFilled key="favorite" />,
      <ShareAltOutlined key="share" />,
      <DownOutlined key="ellipsis" />,
    ]}
    title={props.data.title}
    extra={<MoreOutlined />}
    
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={props.data.language}
      description={props.data.description}
    />
  </Card>
  );
};

export default ProjectCardComponent;
