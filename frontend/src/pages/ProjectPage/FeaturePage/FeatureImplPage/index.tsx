import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  useContext,
} from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../../components/layout/DefaultLayout";
import Editor from "@monaco-editor/react";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../../../core/IRemoteData";
import { Button, Spin, Form, message } from "antd";
import { FeatureDTO } from "cloudsourced-api";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import ResizeObserver from "react-resize-observer";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../../../core/api";
import DataContext from "../../../../core/DataContext";


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
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);

  const editorRef = useRef<any>();
  const {
    handleSubmit,
    errors,
    control,
    setValue,
    getValues,
    formState,
  } = useForm({
    validationSchema,
  });
  const [feature, setFeature] = useState<IRemoteData<FeatureDTO, null>>(
    fromLoading()
  );


  const projectId = useMemo<number | null>(
    () =>
      isNaN(Number(props.match.params.projectId))
        ? null
        : Number(props.match.params.projectId),
    [props.match.params.projectId]
  );
  const featureId = useMemo<number | null>(
    () =>
      isNaN(Number(props.match.params.featureId))
        ? null
        : Number(props.match.params.featureId),
    [props.match.params.featureId]
  );

  const onSubmit = useCallback(
    async (data) => {
      await dataContext.implementation.addImplementationToFeature({
        featureId: featureId!,
        code: data.code!,
      });

      message.success(
        "Implementation has successfully been added to the feature."
      );
      props.history.push(`/projects/${projectId}/features/${featureId}`);
    },
    [featureId, props.history, projectId, dataContext.implementation]
  );

  const [
    editorDimensions,
    setEditorDimensions,
  ] = useState<IEditorDimensions | null>(null);

  useEffect(() => {
    if (featureId === null) {
      return;
    }

    (async () => {
      const result = await dataContext.feature.getOneById({
        id: featureId,
      });
      setFeature(fromLoaded(result.feature));

      setValue("code", result.feature.codePreview!);
    })();
  }, [featureId, setValue, dataContext.implementation, dataContext.feature]);

  const options = useMemo(
    () => ({
      selectOnLineNumbers: true,
      fontSize: 14,
    }),
    []
  );

  if (featureId === null || projectId === null) {
    return <DefaultLayout>Whoops! Something went wrong.</DefaultLayout>;
  }

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
                      <Editor
                        width={`${
                          editorDimensions == null ? 0 : editorDimensions.width
                        }px`}
                        height={`${
                          editorDimensions == null ? 0 : editorDimensions.height
                        }px`}
                        language={feature.data!.codeLanguage}
                        theme="vs-dark"
                        options={options}
                        value={getValues("code")}
                        editorDidMount={(_, editor) => {
                          editorRef.current = editor;
                          editorRef.current.onDidChangeModelContent(() => {
                            const value = editorRef.current.getValue();
                            setValue("code", value);
                          });
                        }}
                      />
                    }
                  />
                </Form.Item>
              </div>
              <Button
                style={{ marginTop: 50 }}
                onClick={handleSubmit(onSubmit)}
                disabled={formState.isSubmitting}
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
