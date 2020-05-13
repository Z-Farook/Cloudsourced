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
import { FieldData, Store } from "rc-field-form/lib/interface";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { UploadOutlined } from "@ant-design/icons";
import ProjectCard from "../ProjectPage/ProjectCard";
import { IProps as IProjectCardProps } from "../ProjectPage/ProjectCard";
import Title from "antd/lib/typography/Title";
interface IProps {}

const { Option } = Select;

interface IValues {
  title: string;
  imageSrc: string;
  language: string;
  description: string;
}

const CreateProjectPage: React.FC<IProps> = () => {
  const [state, setState] = useState<IValues>({
    title: "",
    imageSrc: "",
    language: "",
    description: "",
  });
  const onFinish = (store: Store) => {
    const result = store as IValues;
    console.log("Success:", result);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFieldsChange = (fields: FieldData[]) => {
    console.log(fields);
    const initial: Partial<IValues> = {};
    const result = fields.reduce<Partial<IValues>>((acc, curr) => {
      const key = curr.name as keyof IValues;
      acc[key] = curr.value;
      return acc;
    }, initial) as IValues;
    setState(result);
  };
  const onFormValueChange = (changedValues: Store, values: Store) => {
    const result = values as IValues;
    setState(result);
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
    // state.imageSrc = e.fileList[0].thumbUrl.toString();
    return e && e.fileList;
  };

  return (
    <DefaultLayout>
      {/* <PageHeader
        className="site-page-header"
        title="Create a new project"
      ></PageHeader> */}
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Title>Create a new project</Title>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onFormValueChange}
              >
                <Form.Item
                  name="title"
                  rules={[
                    { required: true, message: "Please add a projectname!" },
                  ]}
                >
                  <Input placeholder="Projectname" />
                </Form.Item>

                <Form.Item
                  name="language"
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
                  name="description"
                  rules={[
                    { required: true, message: "Please add a description!" },
                  ]}
                >
                  <Input placeholder="Description" />
                </Form.Item>
                <Form.Item
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="logo" listType="picture">
                    <Button>
                      <UploadOutlined /> Click to upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={5} lg={6} md={12} sm={20} xs={24}>
              <ProjectCard
                {...state}
                avatarSource=""
                imageSource={state.imageSrc}
              ></ProjectCard>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
