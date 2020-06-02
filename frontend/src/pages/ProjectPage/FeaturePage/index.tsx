import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { Button, Spin, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading
} from "../../../core/IRemoteData";
import {
  Feature,
  FeatureResourceApi,
  GetOneByIdUsingGET1Request
} from "cloudsourced-api";

const { Title, Paragraph } = Typography;

interface IRouteParams {
  projectId: string;
  featureId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {}

// These are temporary mock models and data
export interface IMockFeature {
  name: string;
  description: string;
  codePreview: string;
  codeLanguage: string;
  points: number;
}

const FeaturePage: React.FC<IProps> = props => {
  const [feature, setFeature] = useState<IRemoteData<Feature, null>>(
    fromLoading()
  );

  const { featureId } = useMemo(() => {
    return {
      projectId: Number(props.match.params.projectId),
      featureId: Number(props.match.params.featureId)
    };
  }, [props.match.params]);

  useEffect(() => {
    (async () => {
      const result = await new FeatureResourceApi().getOneByIdUsingGET({
        id: featureId
      });
      setFeature(fromLoaded(result));
    })();
  }, [featureId]);

  return (
    <DefaultLayout>
      {/*<div>Project ID: {projectId}</div>*/}
      {/*<div>Feature ID: {featureId}</div>*/}

      <div style={{ padding: 50 }}>
        {feature.state === EState.Loading ? (
          <Spin />
        ) : feature.state === EState.Loaded ? (
          <div>
            <Title level={2}>{feature.data!.name}</Title>
            {/* TODO: points */}
            {/* <Paragraph strong>Points: {feature.data!.points}</Paragraph> */}
            <Paragraph>{feature.data!.description}</Paragraph>
            <SyntaxHighlighter
              language={feature.data!.codeLanguage}
              style={docco}
            >
              {feature.data!.codePreview}
            </SyntaxHighlighter>

            <Button style={{ marginTop: 10 }}>Provide implementation</Button>
          </div>
        ) : (
          <div>Whoops!</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FeaturePage;
