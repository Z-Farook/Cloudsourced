import * as React from "react";
import { Card, Button, Statistic } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FeatureDTO } from "cloudsourced-api";
import { DollarOutlined } from "@ant-design/icons";
import {languages} from "../../../core/languages";

interface IProps extends RouteComponentProps {
  data: FeatureDTO;
  projectId: Number;
}

const FeatureCard: React.FC<IProps> = (props) => {

  const {
    id,
    name,
    description,
    codeLanguage,
    codePreview,
    points,
  } = props.data;
  const projectId = props.projectId;

  // @ts-ignore
  // @ts-ignore

  return (
    <Card
      style={{ marginBottom: "20px" }}
      title={ <div >{name} <i className={'devicon-' +Object.keys(languages).find(
          key => Object.keys(languages).indexOf(key) === Object.values(languages).indexOf( codeLanguage as languages ))
       + '-plain colored'}/></div>}
      extra={
        <Statistic
          value={points}
          precision={0}
          valueStyle={{ color: "green" }}
          prefix={<DollarOutlined />}
          suffix=""
        />
      }
    >
      <p>Description: {description}</p>
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
