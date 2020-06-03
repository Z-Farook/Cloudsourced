import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";
import { Store } from "antd/lib/form/interface";
import { AuthenticationResourceApi } from "cloudsourced-api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IValues {
  email: string;
  password: string;
}

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
              onFinish={async (store: Store) => {
                const values = store as IValues;

                try {
                  const result = await new AuthenticationResourceApi().authenticateUserUsingPOST(
                    {
                      authenticationUserDTO: {
                        email: values.email,
                        password: values.password,
                      },
                    }
                  );
                  alert(result.id);
                } catch (err) {
                  alert(err.message);
                }
              }}
              onFinishFailed={() => {}}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email" }]}
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
                  Login
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
