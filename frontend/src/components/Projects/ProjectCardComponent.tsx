import React from "react";


import { Card, Avatar } from "antd";
import {SettingOutlined, EditOutlined, EllipsisOutlined, MoreOutlined, HeartFilled, ShareAltOutlined, DownOutlined} from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";
interface IProps {}

const ProjectCardComponent: React.FC<IProps> = (props) => {
  return (
 <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <HeartFilled key="favorite" />,
      <ShareAltOutlined key="share" />,
      <DownOutlined key="ellipsis" />,
    ]}
    title="Projectname"
    extra={<MoreOutlined />}
    
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title="Typescript"
      description="This is the description of a project."
    />
  </Card>
  );
};

export default ProjectCardComponent;
