import * as React from "react";
import { Card, Button } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IData {
  naam: string;
  description: string;
  codeLanguage: string;
  codePreview: string;
}

interface IProps {
  data: IData;
}

const FeatureCard: React.FC<IProps> = (props) => {
  const { children, data } = props;
  const { description, naam, codePreview, codeLanguage } = data;
  return (
    <Card title={naam}>
      <p>{description}</p>
      <SyntaxHighlighter language={codeLanguage} style={docco}>
        {codePreview}
      </SyntaxHighlighter>
      <Button>View details</Button>
    </Card>
  );
};

export default FeatureCard;
