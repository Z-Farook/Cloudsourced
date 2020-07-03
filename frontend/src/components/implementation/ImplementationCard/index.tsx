import React from "react";
import {ImplementationDTO} from "cloudsourced-api";
import {Card, Button} from "antd";
import {formatUser} from "../../../formatters/user";
import {RouteComponentProps, withRouter, Link} from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface IProps extends RouteComponentProps {
  codeLanguage: string;
  impl: ImplementationDTO;
}

const ImplementationCard: React.FC<IProps> = (props) => {
  return (
    <Card>
      <div>
        <SyntaxHighlighter language={props.codeLanguage}
                           style={docco}

        >

          {props.impl.code!}
        </SyntaxHighlighter>

      </div>
      <div style={{marginTop: 20, display: 'flex', alignItems: 'end'}}>
        <div>
        <span>
          by&nbsp;
        </span>
          <Link to={`/user/${props.impl.user!.id}`}>
            {formatUser(props.impl.user!)}
          </Link>
        </div>
        <div style={{flex: 1}}/>

        <div>
          <Button onClick={() => {
            props.history.push(`/projects/1/features/1/implementations/${props.impl.id}`);
          }}>
            To detail view
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default withRouter(ImplementationCard);


