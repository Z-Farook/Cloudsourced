import * as React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Spin, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const { Title, Paragraph } = Typography;

interface IRouteParams {
  projectId: string;
  featureId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {}

// These are temporary mock models and data
interface IMockFeature {
  name: string;
  description: string;
  codePreview: string;
  codeLanguage: string;
  points: number;
}

const FeaturePage: React.FC<IProps> = (props) => {
  const [feature, setFeature] = useState<IMockFeature | null>({
    name: "Basic login form",
    points: 100,
    description:
      "We want a login form that takes an email and a password, with validation and the ability to submit the form.",
    codeLanguage: "tsx",
    codePreview: `interface IProps {
  // These fields can be filled so they need to be used as default values
  emailAddress?: string;
  password?: string;
  onSubmit: (emailAddress: string, password: String) => Promise<void>;
}

const LoginForm: React.FC<IProps> = (props) => {
   return (
      // Please implement
   );
};`,
  });

  const { projectId, featureId } = useMemo(() => {
    return {
      projectId: Number(props.match.params.projectId),
      featureId: Number(props.match.params.featureId),
    };
  }, [props.match.params]);

  useEffect(() => {
    // Ophalen feature
  }, [projectId, featureId]);

  return (
    <DefaultLayout>
      {/*<div>Project ID: {projectId}</div>*/}
      {/*<div>Feature ID: {featureId}</div>*/}

      <div style={{ padding: 50 }}>
        {feature === null ? (
          <Spin />
        ) : (
          <div>
            <Title level={2}>{feature.name}</Title>
            <Paragraph strong>Points: {feature.points}</Paragraph>
            <Paragraph>{feature.description}</Paragraph>
            <SyntaxHighlighter language={feature.codeLanguage} style={docco}>
              {feature.codePreview}
            </SyntaxHighlighter>

            <Button style={{ marginTop: 10 }}>Provide implementation</Button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FeaturePage;
