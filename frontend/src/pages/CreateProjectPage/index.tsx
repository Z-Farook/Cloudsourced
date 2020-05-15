import React from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ProjectCard from "../ProjectPage/ProjectCard";
import Title from "antd/lib/typography/Title";
interface IProps {}

type Inputs = {
  example: string;
  exampleRequired: string;
};
const CreateProjectPage: React.FC<IProps> = () => {
  const { control, handleSubmit, errors } = useForm<Inputs>();

  // const normFile = (e: any) => {
  //   // setImageSrc(e.file.thumbUrl);
  //   return e && e.fileList;
  // };

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
                  rules={{ required: true }}
                />
                <ErrorMessage
                  errors={errors}
                  name="projectName"
                  message="A project name is required"
                />
                <Controller
                  as={Select}
                  name="language"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                />
                <ErrorMessage
                  errors={errors}
                  name="language"
                  message="A language is required"
                />
                <Controller
                  as={Input}
                  name="description"
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
            <Col xl={5} lg={6} md={12} sm={20} xs={24}>
              <ProjectCard
                project={{
                  description: "",
                  id: -1,
                  image: "",
                  name: "",
                  user: { name: "", id: -1 },
                }}
              ></ProjectCard>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
