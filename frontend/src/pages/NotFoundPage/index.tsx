import React from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";

interface IProps {}

const NotFoundPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      Not found!
    </DefaultLayout>
  );
};

export default NotFoundPage;
