import React, { useState } from "react";
import {
  PageHeader,
  Form,
  Input,
  Button,
  Upload,
  Select,
  Row,
  Col,
} from "antd";
import { FieldData } from "rc-field-form/lib/interface";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { UploadOutlined } from "@ant-design/icons";
import ProjectCard from "../ProjectPage/ProjectCard";
import { IProps as IProjectCardProps } from "../ProjectPage/ProjectCard";
interface IProps {}

const { Option } = Select;

const CreateProjectPage: React.FC<IProps> = () => {
  const [state, setState] = useState({
    title: "",
    imageSource: "",
    language: "",
    description: "",
    avatarSource: "",
  });
  const onFinish = (values: Array<FieldData>) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
  };
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <DefaultLayout>
      <PageHeader
        className="site-page-header"
        title="Create a new project"
      ></PageHeader>
      <div>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFieldsChange={(e: Array<FieldData>) =>
                  setState({
                    title: e[0].value,
                    imageSource: "",
                    language: e[1].value,
                    description: e[2].value,
                    avatarSource: "",
                  })
                }
              >
                <Form.Item
                  label="Projectname"
                  name="projectname"
                  rules={[
                    { required: true, message: "Please add a projectname!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="select"
                  label="Select"
                  hasFeedback
                  rules={[
                    { required: true, message: "Please select a language!" },
                  ]}
                >
                  <Select placeholder="Please select a language">
                    <Option value="Typescript">Typescript</Option>
                    <Option value="C#">C#</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please add a description!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="upload"
                  label="Project Image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                      <UploadOutlined /> Click to upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={5} lg={6} md={6} sm={12} xs={8}>
              <ProjectCard {...state}></ProjectCard>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
