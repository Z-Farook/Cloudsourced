import React from "react";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Title from "antd/lib/typography/Title";

import {
  AddFeatureToProjectUsingPOSTRequest,
  FeatureResourceApi,
} from "cloudsourced-api";
import { RouteComponentProps } from "react-router";
import { Store } from "antd/lib/form/interface";
interface IRouterParams {
  projectId: string;
}
interface IProps extends RouteComponentProps<IRouterParams> {}

type Inputs = {
  featureName: string;
  description: string;
  codePreview: string;
  codeLanguage: string;
};
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const CreateFeaturePage: React.FC<IProps> = (props) => {
  const projectId = +props.match.params.projectId;
  const handleSubmit = async (values: Store) => {
    console.log(values);
    const params: AddFeatureToProjectUsingPOSTRequest = {
      projectId: projectId,
      feature: {
        name: values.featureName,
        description: values.description,
        codeLanguage: values.codeLanguage,
        codePreview: values.codePreview,
      },
    };
    message.loading({ content: "Saving project...", key: "updatableKey" });
    await new FeatureResourceApi()
      .addFeatureToProjectUsingPOST(params)
      .then(() => {
        message.success({
          content: "Feature is created succesfully!",
          key: "updatableKey",
          duration: 2,
        });
        props.history.push(`/projects/${projectId}`);
      })
      .catch(() => {
        errorMessage();
      });
  };

  const errorMessage = () => {
    message.error({
      content: "Something went wrong",
      key: "updatableKey",
      duration: 2,
    });
  };
  return (
    <DefaultLayout>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <Title>Create a new feature</Title>

              <Form {...layout} onFinish={handleSubmit}>
                <Form.Item
                  label="Feature name"
                  name="featureName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the feature name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the description!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="codeLanguage"
                  label="Language"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                  >
                    <Option value="typescript">TypeScript</Option>
                    <Option value="csharp">C#</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Code preview"
                  name="codePreview"
                  rules={[
                    {
                      required: true,
                      message: "Please input the code preview!",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateFeaturePage;
