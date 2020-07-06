import * as React from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {
  Button,
  Spin,
  Typography,
  PageHeader,
  Tooltip,
  Popconfirm,
  Divider,
} from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import IRemoteData, {
  EState,
  fromLoaded,
  fromLoading,
} from "../../../core/IRemoteData";
import { FeatureDTO, ImplementationDTO } from "cloudsourced-api";
import { api } from "../../../core/api";
import DataContext from "../../../core/DataContext";
import ImplementationCard from "../../../components/implementation/ImplementationCard";
import {
  DollarOutlined,
  FileExclamationTwoTone,
  ExclamationOutlined,
  FileExclamationOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;

interface IRouteParams {
  projectId: string;
  featureId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {}

const FeaturePage: React.FC<IProps> = (props) => {
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);
  const [feature, setFeature] = useState<IRemoteData<FeatureDTO, null>>(
    fromLoading()
  );
  const [implementations, setImplementations] = useState<
    IRemoteData<Array<ImplementationDTO>, null>
  >(fromLoading());

  const { projectId, featureId } = useMemo(() => {
    return {
      projectId: Number(props.match.params.projectId),
      featureId: Number(props.match.params.featureId),
    };
  }, [props.match.params]);
  const archiveFeature = async () => {
    const result = await dataContext.feature.finishOneById({
      featureId: featureId,
    });

    setFeature(fromLoaded(result));
  };
  useEffect(() => {
    (async () => {
      const result = await dataContext.feature.getOneById({
        id: featureId,
      });
      setFeature(fromLoaded(result.feature));
    })();
  }, [featureId, dataContext.feature.getOneById, dataContext.feature]);

  useEffect(() => {
    (async () => {
      const result = await dataContext.implementation.getImplementationsFromFeature(
        {
          featureId,
        }
      );
      setImplementations(fromLoaded(result.implementations));
    })();
  }, [
    featureId,
    dataContext.implementation,
    dataContext.implementation.getImplementationsFromFeature,
  ]);

  return (
    <DefaultLayout>
      <div style={{ padding: 50 }}>
        {feature.state === EState.Loading ||
        implementations.state === EState.Loading ? (
          <Spin />
        ) : feature.state === EState.Loaded &&
          implementations.state === EState.Loaded ? (
          <div>
            <PageHeader
              title={feature.data!.name}
              extra={[
                <DollarOutlined style={{ color: "green" }} />,
                <div style={{ color: "green" }}> {feature.data!.points}</div>,
                feature.data?.archivedAt ? (
                  <Tooltip key="" title="This project is archived">
                    <FileExclamationTwoTone
                      twoToneColor="red"
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip key="archive" title="Archive project">
                    <Popconfirm
                      title="Do you want to archive this project?"
                      okText="Yes"
                      cancelText="No"
                      placement="bottom"
                      icon={
                        <ExclamationOutlined
                          style={{
                            color: "grey",
                            cursor: "pointer",
                          }}
                        />
                      }
                      onConfirm={archiveFeature}
                    >
                      <FileExclamationOutlined />
                    </Popconfirm>
                  </Tooltip>
                ),
              ]}
            />

            <Paragraph>{feature.data!.description}</Paragraph>
            <SyntaxHighlighter
              language={feature.data!.codeLanguage}
              style={docco}
            >
              {feature.data!.codePreview}
            </SyntaxHighlighter>

            <Button
              style={{ marginTop: 10 }}
              onClick={() => {
                props.history.push(
                  `/projects/${projectId}/features/${featureId}/implementation`
                );
              }}
            >
              Provide implementation
            </Button>

            {implementations.data!.length !== 0 && (
              <>
                <Divider/>
                <h2 style={{ marginTop: 20 }}>Implementations</h2>

                <div style={{ marginTop: 20 }}>
                  {implementations.data!.map((impl, i) => {
                    return (
                      <div
                        key={impl.id}
                        style={{
                          marginBottom: i === implementations.data!.length ? 0 : 20,
                        }}
                      >
                        <ImplementationCard impl={impl} codeLanguage={feature.data!.codeLanguage!} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ) : (
          <div>Whoops!</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FeaturePage;
