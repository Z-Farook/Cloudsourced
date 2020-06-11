import React, { useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { Form, Input, Button, Checkbox, Card, Row, Col, message } from "antd";
import { AuthenticationResourceApi, Configuration } from "cloudsourced-api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api, saveAuthentication } from "../../../core/api";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .email("Must be a valid email address"),
  password: yup.string().required("Password is a required field"),
});

interface IValues {
  email: string;
  password: string;
}

interface IProps extends RouteComponentProps {}

const LoginPage: React.FC<IProps> = (props) => {
  const { handleSubmit, errors, setValue, register } = useForm({
    validationSchema,
  });

  const onSubmit = async (data: any) => {
    const values = data as IValues;

    try {
      const result = await new AuthenticationResourceApi(
        api.config
      ).authenticateUserUsingPOST({
        authenticationUserDTO: {
          email: values.email,
          password: values.password,
        },
      });
      saveAuthentication(result);
      props.history.push(`/account`);
    } catch (err) {
      message.error("Email or password is incorrect.");
    }
  };

  useEffect(() => {
    register({ name: "email" });
    register({ name: "password" });
  }, []);

  return (
    <DefaultLayout>
      <Row style={{ marginTop: 50 }}>
        <Col xs={6} />
        <Col xs={12}>
          <Card title="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Item
                label="Email"
                name="email"
                validateStatus={
                  errors.email !== undefined ? "error" : undefined
                }
                help={
                  errors.email !== undefined ? errors.email.message : undefined
                }
              >
                <Input
                  name="email"
                  onChange={(ev) => setValue("email", ev.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
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
                  onChange={(ev) => setValue("password", ev.target.value)}
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
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
