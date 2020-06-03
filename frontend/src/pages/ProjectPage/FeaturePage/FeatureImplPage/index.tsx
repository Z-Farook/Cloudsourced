import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../../components/layout/DefaultLayout";
import MonacoEditor from "react-monaco-editor";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../../../core/IRemoteData";
import { Feature } from "../../../../../gen/api/dist/models";
import { Button, Spin, Form } from "antd";
import { FeatureResourceApi } from "cloudsourced-api";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import ResizeObserver from "react-resize-observer";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  code: yup.string().required("Code is a required field"),
});

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
  const { handleSubmit, errors, control, setValue, getValues } = useForm({
    validationSchema,
  });
  const onSubmit = useCallback((data) => alert(JSON.stringify(data)), []);

  const [feature, setFeature] = useState<IRemoteData<Feature, null>>(
    fromLoading()
  );

  const projectId = useMemo(() => Number(props.match.params.projectId), [
    props.match.params.projectId,
  ]);
  const featureId = useMemo(() => Number(props.match.params.featureId), [
    props.match.params.featureId,
  ]);

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

      setValue("code", result.codePreview!);
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

            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div style={{ width: "100%", height: 500 }}>
                <ResizeObserver
                  onResize={(rect) =>
                    setEditorDimensions({
                      width: rect.width,
                      height: rect.height,
                    })
                  }
                />
                <Form.Item
                  validateStatus={
                    errors.code !== undefined ? "error" : undefined
                  }
                  help={
                    errors.code !== undefined ? errors.code.message : undefined
                  }
                >
                  <Controller
                    name="code"
                    control={control}
                    as={
                      <MonacoEditor
                        width={`${
                          editorDimensions == null ? 0 : editorDimensions.width
                        }px`}
                        height={`${
                          editorDimensions == null ? 0 : editorDimensions.height
                        }px`}
                        language={feature.data!.codeLanguage}
                        theme="vs-dark"
                        value={getValues("code")}
                        options={options}
                        onChange={(x) => setValue("code", x)}
                      />
                    }
                  />
                </Form.Item>
              </div>
              <Button
                style={{ marginTop: 50 }}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </Form>
          </>
        ) : (
          <div>Whoops!</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FeatureImplPage;
