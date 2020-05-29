import React, { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../../components/layout/DefaultLayout";
import MonacoEditor from "react-monaco-editor";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../../../core/IRemoteData";
import { Feature } from "../../../../../gen/api/dist/models";
import { Button, Spin } from "antd";
import { FeatureResourceApi } from "cloudsourced-api";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import ResizeObserver from "react-resize-observer";

export interface IRouterParams {
  projectId: string;
  featureId: string;
}

interface IProps extends RouteComponentProps<IRouterParams> {}

interface IEditorDimensions {
  width: number;
  height: number;
}

const FeatureImplPage: React.FC<IProps> = (props) => {
  const [feature, setFeature] = useState<IRemoteData<Feature, null>>(
    fromLoading()
  );

  const projectId = useMemo(() => Number(props.match.params.projectId), [
    props.match.params.projectId,
  ]);
  const featureId = useMemo(() => Number(props.match.params.featureId), [
    props.match.params.featureId,
  ]);

  const [code, setCode] = useState("");
  const [
    editorDimensions,
    setEditorDimensions,
  ] = useState<IEditorDimensions | null>(null);

  useEffect(() => {
    (async () => {
      const result = await new FeatureResourceApi().getOneByIdUsingGET({
        id: featureId,
      });
      setFeature(fromLoaded(result));

      setCode(result.codePreview!);
    })();
  }, [featureId]);

  const options = useMemo(
    () => ({
      selectOnLineNumbers: true,
      fontSize: 14,
    }),
    []
  );

  return (
    <DefaultLayout>
      <div
        style={{
          padding: 50,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {feature.state === EState.Loading ? (
          <Spin />
        ) : feature.state === EState.Loaded ? (
          <>
            <Title level={2}>{feature.data!.name}</Title>
            {/* TODO: points */}
            {/* <Paragraph strong>Points: {feature.data!.points}</Paragraph> */}
            <Paragraph>{feature.data!.description}</Paragraph>

            <div style={{ flex: 1, height: 500 }}>
              <ResizeObserver
                onResize={(rect) =>
                  setEditorDimensions({
                    width: rect.width,
                    height: rect.height,
                  })
                }
              />
              <MonacoEditor
                width={`${
                  editorDimensions == null ? 0 : editorDimensions.width
                }px`}
                height={`${
                  editorDimensions == null ? 0 : editorDimensions.height
                }px`}
                language={feature.data!.codeLanguage}
                theme="vs-dark"
                value={code}
                options={options}
                onChange={(x) => setCode(x)}
                editorDidMount={() => {}}
              />
            </div>
            <Button
              style={{ marginTop: 20 }}
              onClick={() => {
                // props.history.push(
                //   `/projects/${projectId}/features/${featureId}/impl`
                // );
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <div>Whoops!</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FeatureImplPage;
