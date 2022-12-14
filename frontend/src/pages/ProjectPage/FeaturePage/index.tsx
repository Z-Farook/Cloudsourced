import * as React from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {Button, Spin, Typography, PageHeader, Divider, Statistic, Popconfirm, Tooltip} from "antd";
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
import { DollarOutlined } from "@ant-design/icons";
import AuthStore from "../../../stores/AuthStore";
import { ProjectDetailDTO } from "../../../../gen/api/src/models";
import {languages} from "../../../core/languages";
import {CheckOutlined, ExclamationOutlined} from "@ant-design/icons/lib";

const { Paragraph } = Typography;

interface IRouteParams {
  projectId: string;
  featureId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {}
const FeaturePage: React.FC<IProps> = (props) => {
  const { auth } = AuthStore.useContainer();
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);
  const [feature, setFeature] = useState<IRemoteData<FeatureDTO, null>>(
    fromLoading()
  );
  const [project, setProject] = useState<IRemoteData<ProjectDetailDTO, null>>(
    fromLoading()
  );
  const [implementations, setImplementations] = useState<
    IRemoteData<Array<ImplementationDTO>, null>
  >(fromLoading());
  const [isOwner, setIsOwner] = useState<Boolean>(false);
  const { projectId, featureId } = useMemo(() => {
    return {
      projectId: Number(props.match.params.projectId),
      featureId: Number(props.match.params.featureId),
    };
  }, [props.match.params]);
  useEffect(() => {
    (async () => {
      try {
        const result = await dataContext.project.getProjectDetail({
          projectId,
        });
        setProject(fromLoaded(result.project));
      } catch (error) {
        if (error.status === 404) {
          props.history.push("/projects");
        } else {
          props.history.push("/error");
        }
      }
    })();
  }, [projectId, dataContext.project, props.history, auth]);

  useEffect(() => {
    (async () => {
      if (auth?.userId === project.data?.user?.id) {
        setIsOwner(true);
      }
    })();
  });

  useEffect(() => {
    (async () => {
      const result = await dataContext.feature.getOneById({
        id: featureId,
      });
      setFeature(fromLoaded(result.feature));
    })();
  }, [
    featureId,
    dataContext.feature.getOneById,
    dataContext.feature,
    props.history,
  ]);
const finishFeature = async() => {

    const result = await dataContext.feature.finishOneById(
        {
          featureId,
        }
    );
    setFeature(fromLoaded(result))


}
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
              title={<>{feature.data!.name} <i className={'devicon-' +Object.keys(languages).find(
                  key => Object.keys(languages).indexOf(key) === Object.values(languages).indexOf( feature.data!.codeLanguage as languages ))
              + '-plain colored'}/></>}
              extra={ feature.data!.finishedAt ? [
                <Tooltip key="finish" title="This feature is finished!">
                  <CheckOutlined  style={{fontSize: "2em", color: "green"}}/>
                </Tooltip>

              ]:[ <Statistic
                key="dollar"
                value={feature.data!.points}
                precision={0}
                valueStyle={{ color: "green" }}
                prefix={<DollarOutlined />}
                suffix=""
                />
              ]}
            />

            <Paragraph>{feature.data!.description}</Paragraph>
            <SyntaxHighlighter
              language={feature.data!.codeLanguage}
              style={docco}
            >
              {feature.data!.codePreview}
            </SyntaxHighlighter>
            {!isOwner && feature.data!.finishedAt == null ? (
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
            ) : isOwner && feature.data!.finishedAt == null? (

                      <Popconfirm
                          title="Do you want to finish this feature?"
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
                          onConfirm={() => finishFeature()}
                      >
                        <Button> Finish feature</Button>
                      </Popconfirm>
            ) : ""}

            {implementations.data!.length !== 0 && (
              <>
                <Divider />
                <h2 style={{ marginTop: 20 }}>Implementations</h2>

                <div style={{ marginTop: 20 }}>
                  {implementations.data!.map((impl, i) => {
                    return (
                      <div
                        key={impl.id}
                        style={{
                          marginBottom:
                            i === implementations.data!.length ? 0 : 20,
                        }}
                      >
                        <ImplementationCard
                          impl={impl}
                          projectId={projectId}
                          featureId={featureId}
                          codeLanguage={feature.data!.codeLanguage!}
                        />
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
