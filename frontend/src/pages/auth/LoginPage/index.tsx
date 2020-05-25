import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IProps extends RouteComponentProps {}

const LoginPage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <Row style={{ marginTop: 50 }}>
        <Col xs={6} />
        <Col xs={12}>
          <Card title="Login">
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={() => {}}
              onFinishFailed={() => {}}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={6} />
      </Row>
    </DefaultLayout>
  );
};

export default LoginPage;
