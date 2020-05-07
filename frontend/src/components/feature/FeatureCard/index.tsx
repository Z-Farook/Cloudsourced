import * as React from "react";
import { Card, Button } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";

interface IData {
  name: string;
  description: string;
  codeLanguage: string;
  codePreview: string;
}

interface IProps {
  data: IData;
}

const FeatureCard: React.FC<IData> = (props) => {
  // const { children, data } = props;
  const { description, name, codePreview, codeLanguage } = props;
  return (
    <Card title={name}>
      <p>{description}</p>
      <SyntaxHighlighter language={codeLanguage} style={docco}>
        {codePreview}
      </SyntaxHighlighter>
      <Button><Link to="/projects/1/features/1">View details</Link></Button>
    </Card>
  );
};

export default FeatureCard;
