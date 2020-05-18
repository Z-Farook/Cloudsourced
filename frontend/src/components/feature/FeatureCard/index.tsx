import * as React from "react";
import { Card, Button } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link, RouteComponentProps } from "react-router-dom";

interface IData  {
  name: string;
  points: number;
  description: string;
  codeLanguage: string;
  codePreview: string;
}

interface IProps extends RouteComponentProps {
  // data: IData;
}

const FeatureCard: React.FC<IProps> = (props) => {
  // const { children, data } = props;
  
  
  const data = {
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
    };
    
  const { description, name, codePreview, codeLanguage } = data;

  return (
    <Card title={name}>
      <p>{description}</p>
      <SyntaxHighlighter language={codeLanguage} style={docco}>
        {codePreview}
      </SyntaxHighlighter>



      {/* <Button><Link to="/projects/1/features/1">View details</Link></Button> */}


      <Button onClick={() => props.history.push('/projects/1/features/1')}>View details</Button>




    </Card>
  );
};

export default FeatureCard;
