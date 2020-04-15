import React from "react";
import { RouteComponentProps } from 'react-router';


interface IProps extends RouteComponentProps {}

const LandingPage: React.FC<IProps> = (props) => {
  return (
    <>
      Landing
    </>
  );
};

export default LandingPage;
