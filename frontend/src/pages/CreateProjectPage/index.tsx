import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, Row, Col } from "antd";
import { Store } from "rc-field-form/lib/interface";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { UploadOutlined } from "@ant-design/icons";
import ProjectCard from "../ProjectPage/ProjectCard";
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
  const [title, setTitle] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const onFinish = (store: Store) => {
    const result = store as IValues;
    console.log("Success:", result);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFormValueChange = (changedValues: Store, values: Store) => {
    setDescription(values.description);
    setLanguage(values.language);
    setTitle(values.title);
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  const normFile = (e: any) => {
    setImageSrc(e.file.thumbUrl);
    return e && e.fileList;
  };

  return (
    <DefaultLayout>
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
                title={title}
                description={description}
                language={language}
                avatarSource=""
                imageSource={imageSrc}
              ></ProjectCard>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
