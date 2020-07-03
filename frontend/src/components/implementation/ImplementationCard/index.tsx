import React from "react";
import { ImplementationDTO } from "cloudsourced-api";
import { Card } from "antd";

interface IProps {
  impl: ImplementationDTO;
}

const ImplementationCard: React.FC<IProps> = (props) => {
  return (
    <Card>
      <code>{JSON.stringify(props.impl)}</code>
    </Card>
  );
};

export default ImplementationCard;
