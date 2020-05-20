import React from "react";
import { Input, Button, Row, Col, message } from "antd";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import DefaultLayout from "../../components/layout/DefaultLayout";

import Title from "antd/lib/typography/Title";

import {
  ProjectResourceApi,
  AddWithUserUsingPOSTRequest,
} from "cloudsourced-api";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps {}

type Inputs = {
  projectName: string;
  description: string;
};

const CreateFeaturePage: React.FC<IProps> = (props) => {


  return (
    <DefaultLayout>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <Title>Create a new project</Title>


            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateFeaturePage;
