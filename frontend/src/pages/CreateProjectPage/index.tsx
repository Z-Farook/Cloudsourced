import React from "react";
import { Input, Button, Row, Col } from "antd";
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

const CreateProjectPage: React.FC<IProps> = (props) => {
  const { control, handleSubmit, errors } = useForm<Inputs>();

  const handleProject = async (data: any) => {
    const params: AddWithUserUsingPOSTRequest = {
      id: 1,
      project: {
        description: data.description,
        user: {},
        name: data.projectName,
        image: "https://source.unsplash.com/500x500/?coding,pc",
      },
    };

    const result = await new ProjectResourceApi().addWithUserUsingPOST(params);
    if (result) {
      props.history.push("/projects");
    }
  };
  return (
    <DefaultLayout>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <Title>Create a new project</Title>

              <form onSubmit={handleSubmit(handleProject)}>
                <Controller
                  as={Input}
                  name="projectName"
                  control={control}
                  defaultValue=""
                  placeholder="Project name"
                  rules={{ required: true }}
                />
                <ErrorMessage
                  errors={errors}
                  name="projectName"
                  message="A project name is required"
                />

                <Controller
                  as={Input}
                  name="description"
                  placeholder="Description"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                />
                <ErrorMessage
                  errors={errors}
                  name="description"
                  message="A description is required"
                />

                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
