import React from "react";
import { RouteComponentProps } from 'react-router';
import DefaultLayout from "../../components/layout/DefaultLayout";


interface IProps extends RouteComponentProps {}

const LandingPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      Landing
    </DefaultLayout>
  );
};

export default LandingPage;
