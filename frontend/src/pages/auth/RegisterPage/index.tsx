import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { Form, Input, Button, Checkbox, Card, Row, Col, message} from "antd";
import { UserOutlined, MailOutlined, LockOutlined, TeamOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { AuthenticationResourceApi, mapValues } from "cloudsourced-api";
import { api } from "../../../core/api";
import * as yup from "yup";

import "./style.scss"
interface IProps extends RouteComponentProps {}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  lastname: yup.string().required("lastname is a required field"),
  email: yup
    .string()
    .required("Email is a required field")
    .email("Must be a valid email address"),
  password: yup.string().required("Password is a required field"),
});

interface IValues{
  name:string,
  lastname:string,
  email:string,
  password:string
};

const RegisterPage: React.FC<IProps> = (props) => {


    const { handleSubmit, errors, setValue, register } = useForm({
      validationSchema,
    });

    const onSubmit = async (data: any) => {
      const values = data as IValues;

      try {
        await new AuthenticationResourceApi(
          api.config
        ).registerNewUserUsingPOST({
          registerUserDTO: {
            name: values.name,
            lastName: values.lastname,
            email: values.email,
            password: values.password,
          },
        });
        message.success("Your account has been created. you can now login!");
      } catch (err) {
        message.error("Email already exists");
      }
    };

  useEffect(() => {
    register({ name: "name" });
    register({ name: "lastname" });
    register({ name: "email" });
    register({ name: "password" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <Row style={{ marginTop: 50 }}>
        <Col xs={6} />
        <Col xs={12}>
          <Card title="Register">
            <form className="register_form" onSubmit={handleSubmit(onSubmit)}>
              <Form.Item
                validateStatus={errors.name !== undefined ? "error" : undefined}
                help={
                  errors.name !== undefined ? errors.name.message : undefined
                }
              >
                <Input
                  placeholder="first name"
                  name="name"
                  onChange={(ev) => setValue("name", ev.target.value)}
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                validateStatus={
                  errors.lastname !== undefined ? "error" : undefined
                }
                help={
                  errors.lastname !== undefined
                    ? errors.lastname.message
                    : undefined
                }
              >
                <Input
                  placeholder="Last name"
                  name="lastname"
                  onChange={(ev) => setValue("lastname", ev.target.value)}
                  prefix={<TeamOutlined />}
                />
              </Form.Item>

              <Form.Item
                validateStatus={
                  errors.email !== undefined ? "error" : undefined
                }
                help={
                  errors.email !== undefined ? errors.email.message : undefined
                }
              >
                <Input
                  placeholder="e-mail"
                  name="email"
                  onChange={(ev) => setValue("email", ev.target.value)}
                  prefix={<MailOutlined />}
                />
              </Form.Item>

              <Form.Item
                validateStatus={
                  errors.password !== undefined ? "error" : undefined
                }
                help={
                  errors.password !== undefined ? errors.password.message : undefined
                }
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  onChange={(ev) => setValue("password", ev.target.value)}
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </form>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default RegisterPage;
