import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { Form, Input, Button, Checkbox, Card, Row, Col, message } from "antd";
import { Store } from "antd/lib/form/interface";
import { AuthenticationResourceApi } from "cloudsourced-api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import MonacoEditor from "react-monaco-editor";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .email("Must be a valid email address"),
  password: yup.string().required("Password is a required field"),
});

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
  const { handleSubmit, errors, watch, setValue, getValues } = useForm({
    validationSchema,
  });
  // const _ = watch();
  const onSubmit = useCallback(async (data) => {
    const values = data as IValues;

    try {
      const result = await new AuthenticationResourceApi().authenticateUserUsingPOST(
        {
          authenticationUserDTO: {
            email: values.email,
            password: values.password,
          },
        }
      );
      alert("ok");
    } catch (err) {
      message.error("Email or password is incorrect.");
    }
    alert(JSON.stringify(data));
  }, []);

  return (
    <DefaultLayout>
      <Row style={{ marginTop: 50 }}>
        <Col xs={6} />
        <Col xs={12}>
          <Card title="Login">
            <form {...layout} onSubmit={handleSubmit(onSubmit)}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email" }]}
                validateStatus={
                  errors.email !== undefined ? "error" : undefined
                }
                help={
                  errors.email !== undefined ? errors.email.message : undefined
                }
              >
                <Input
                  name="email"
                  value={getValues("email")}
                  onChange={(x) => setValue("email", x)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
                validateStatus={
                  errors.password !== undefined ? "error" : undefined
                }
                help={
                  errors.password !== undefined
                    ? errors.password.message
                    : undefined
                }
              >
                <Input.Password
                  name="password"
                  value={getValues("password")}
                  onChange={(x) => setValue("password", x)}
                />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <code>{JSON.stringify(getValues())}</code>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </form>
          </Card>
        </Col>
        <Col xs={6} />
      </Row>
    </DefaultLayout>
  );
};

export default LoginPage;
