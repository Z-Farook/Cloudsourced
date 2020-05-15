import React, { useState, ChangeEvent } from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ProjectCard from "../ProjectPage/ProjectCard";
import Title from "antd/lib/typography/Title";
import { UploadOutlined } from "@ant-design/icons";

interface IProps {}

type Inputs = {
  projectName: string;
  description: string;
};

const CreateProjectPage: React.FC<IProps> = () => {
  const { control, handleSubmit, errors } = useForm<Inputs>();

  return (
    <DefaultLayout>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Title>Create a new project</Title>

              <Form>
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

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={handleSubmit((data) => console.log(data))}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
