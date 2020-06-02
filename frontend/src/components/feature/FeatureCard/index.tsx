import * as React from "react";
import { Card, Button } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Feature } from "cloudsourced-api";

interface IProps extends RouteComponentProps {
  data: Feature;
  projectId: Number;
}

const FeatureCard: React.FC<IProps> = props => {
  const { id, name, description, codeLanguage, codePreview } = props.data;
  const projectId = props.projectId;

  return (
    <Card style={{ marginBottom: "20px" }} title={name}>
      <p>{description}</p>
      <SyntaxHighlighter language={codeLanguage} style={docco}>
        {codePreview}
      </SyntaxHighlighter>

      <Button
        onClick={() =>
          props.history.push(`/projects/${projectId}/features/${id}`)
        }
      >
        View details
      </Button>
    </Card>
  );
};

export default withRouter(FeatureCard);
