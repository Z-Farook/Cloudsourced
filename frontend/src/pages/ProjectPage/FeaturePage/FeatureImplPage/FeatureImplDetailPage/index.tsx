import React, {useContext, useEffect, useMemo, useState} from "react";
import DefaultLayout from "../../../../../components/layout/DefaultLayout";
import {RouteComponentProps} from "react-router";
import DataContext from "../../../../../core/DataContext";
import {api} from "../../../../../core/api";
import IRemoteData, {EState, fromLoaded, fromLoading} from "../../../../../core/IRemoteData";
import {FeatureDTO, ImplementationDTO, ReviewDTO} from "cloudsourced-api";
import {Button, Card, Divider, Spin} from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {Link} from "react-router-dom";
import {formatUser} from "../../../../../formatters/user";
import TextArea from "antd/lib/input/TextArea";

export interface IRouteParams {
  projectId: string;
  featureId: string;
  implementationId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
}

const FeatureImplDetailPage: React.FC<IProps> = (props) => {
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);
  const [feature, setFeature] = useState<IRemoteData<FeatureDTO, null>>(
    fromLoading()
  );
  const [implementation, setImplementation] = useState<IRemoteData<ImplementationDTO, null>>(
    fromLoading()
  );
  const [reviews, setReviews] = useState<IRemoteData<ReviewDTO[], null>>(
    fromLoading()
  );
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

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
  const implementationId = useMemo<number | null>(
    () =>
      isNaN(Number(props.match.params.implementationId))
        ? null
        : Number(props.match.params.implementationId),
    [props.match.params.implementationId]
  );

  useEffect(() => {
    if (featureId === null) {
      return;
    }

    (async () => {
      const result = await dataContext.feature.getOneById({
        id: featureId,
      });
      setFeature(fromLoaded(result.feature));
    })();
  }, [featureId, dataContext.feature]);

  useEffect(() => {
    if (implementationId === null) {
      return;
    }

    (async () => {
      const result = await dataContext.implementation.getOneById({
        id: implementationId,
      });
      setImplementation(fromLoaded(result));
    })();
  }, [implementationId, dataContext.implementation.getOneById]);

  useEffect(() => {
    if (implementationId === null) {
      return;
    }

    (async () => {
      const result = await dataContext.review.getReviewsFromImplementation({
        implementationId: implementationId,
      });
      setReviews(fromLoaded(result.reviews));
    })();
  }, [implementationId, dataContext.review.getReviewsFromImplementation]);

  return (
    <DefaultLayout>
      {feature.state !== EState.Loaded || implementation.state !== EState.Loaded ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Spin/>
        </div>
      ) : (
        <div>
          <Card style={{padding: 15, paddingTop: 0}}>
            <h2>Implementation</h2>
            <div style={{marginTop: 20}}>
              <SyntaxHighlighter language={feature.data!.codeLanguage} style={docco}>
                {implementation.data!.code!}
              </SyntaxHighlighter>
            </div>
            <div style={{marginTop: 20, display: "flex", alignItems: "end"}}>
              <div>
                <span>by&nbsp;</span>
                <Link to={`/user/${implementation.data!.user!.id}`}>
                  {formatUser(implementation.data!.user!)}
                </Link>
              </div>
              <div style={{flex: 1}}/>

              <div>
                <Button
                  onClick={() => {
                    alert('TODO');
                  }}
                >
                  Accept Implementation
                </Button>
              </div>
            </div>
          </Card>

          <div style={{padding: 15, paddingLeft: 40, paddingRight: 40}}>
            <h2 style={{marginTop: 20}}>Discussion</h2>

            <div style={{marginTop: 20}}>
              {reviews.state !== EState.Loaded ? (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Spin/>
                </div>
              ) : (
                <div>
                  {reviews.data!.map((review) => {
                    return <div style={{display: "flex", flexDirection: "column", marginBottom: 10}}>
                      <div>
                        <Link to={`/user/${review.user!.id}`}>
                          {formatUser(review.user!)}
                        </Link>
                      </div>
                      <div style={{ whiteSpace: "pre" }}>{review.message}</div>
                    </div>;
                  })}
                  {reviews.data!.length === 0 && (
                    <div>There are no messages as of this moment.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div style={{padding: 15, paddingLeft: 40, paddingRight: 40}}>
            <TextArea rows={5} placeholder="Leave a message..." value={message}
                      onChange={(ev) => setMessage(ev.target.value)}
                      disabled={isSendingMessage}
            />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button
                style={{marginTop: 15}}
                onClick={async () => {
                  setIsSendingMessage(true);
                  const result = await dataContext.review.addReviewToImplementation({
                    implementationId: implementationId!,
                    review: {message: message.trim()}
                  });
                  setReviews(fromLoaded(
                    [
                      ...reviews.data!,
                      result.review,
                    ]
                  ));
                  setMessage('');
                  setIsSendingMessage(false);
                }}
                disabled={message.trim().length === 0 || isSendingMessage}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default FeatureImplDetailPage;
