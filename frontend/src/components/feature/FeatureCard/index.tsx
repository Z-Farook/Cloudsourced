import * as React from "react";
import { Card, Button } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Feature } from "cloudsourced-api";

interface IRouterParams {
  projectId: string;
}

interface IProps extends RouteComponentProps<IRouterParams> {
  data: Feature;
}

const FeatureCard: React.FC<IProps> = (props) => {
  const { id, name, description, codeLanguage, codePreview } = props.data;
  const projectId = props.match.params.projectId;

  // const data = {
  //   name: "Basic login form",
  //   points: 100,
  //   description:
  //     "We want a login form that takes an email and a password, with validation and the ability to submit the form.",
  //   codeLanguage: "tsx",
  //   codePreview: `interface IProps {
  //     // These fields can be filled so they need to be used as default values
  //     emailAddress?: string;
  //     password?: string;
  //     onSubmit: (emailAddress: string, password: String) => Promise<void>;
  //   }

  //   const LoginForm: React.FC<IProps> = (props) => {
  //     return (
  //       // Please implement
  //       );
  //     };`,
  // };

  // const { description, name, codePreview, codeLanguage } = data;

  return (
    <Card title={name}>
      <p>{description}</p>
      <SyntaxHighlighter language={codeLanguage} style={docco}>
        {codePreview}
      </SyntaxHighlighter>

      <Button onClick={() => props.history.push(`/projects/${projectId}/features/${id}`)}>
        View details
      </Button>
    </Card>
  );
};

export default withRouter(FeatureCard);
