import React, {useEffect, useContext, useMemo, useState} from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import {Form, Input, Button, Card, Row, Col, message, Upload} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  TeamOutlined,
  HomeOutlined,
  IdcardOutlined,
  NumberOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { api } from "../../../core/api";
import * as yup from "yup";

import "./style.scss";
import DataContext from "../../../core/DataContext";
import noImage from "../../../assets/noimage.png";
interface IProps extends RouteComponentProps {}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  lastname: yup.string().required("lastname is a required field"),
  email: yup
    .string()
    .required("Email is a required field")
    .email("Must be a valid email address"),
  password: yup.string().required("Password is a required field"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords don't match")
    .required("Confirm Password is required"),
});

interface IValues {
  name: string;
  infix: string;
  lastname: string;
  country: string;
  telephone: string;
  street: string;
  streetNumber: string;
  languages: string[];
  email: string;
  password: string;
}

const RegisterPage: React.FC<IProps> = (props) => {
  const createDataContext = useContext(DataContext);
  const dataContext = useMemo(() => createDataContext(api.config), [
    createDataContext,
  ]);

  const { handleSubmit, errors, setValue, register } = useForm({
    validationSchema,
  });
  const [image, setImage] = useState("");

  const getBase64 = (image: Blob) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
    reader.readAsDataURL(image);
  };
  const errorMessage = () => {
    message.error({
      content: "Something went wrong",
      key: "updatableKey",
      duration: 2,
    });
  };
  const postImage = async (image: string): Promise<string> => {
    image = image.split("base64,")[1];
    const url = "https://api.imgur.com/3/image";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Client-ID 2b1eae61348c066",
      },
      body: JSON.stringify({
        image,
        type: "base64",
      }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data)
      return data!.data!.link;
    } catch (e) {
      errorMessage();
      return "";
    }
  };
  const onSubmit = async (data: any) => {
    const values = data as IValues;

    try {
     await dataContext.authentication.registerNewUser({
        name: values.name,
        infix: values.infix,
        lastName: values.lastname,
        country: values.country,
        telephone: values.telephone,
        street: values.street,
        streetNumber: values.streetNumber,
        languages: values.languages,
        email: values.email,
        password: values.password,
        image: await postImage(image),
      });
      message.success("Your account has been created. you can now login!");
      props.history.push(`/auth/login`);
    } catch (err) {
      message.error("Email already exists");
    }
  };

  useEffect(() => {
    register({ name: "name" });
    register({ name: "infix" });
    register({ name: "lastname" });
    register({ name: "country" });
    register({ name: "street" });
    register({ name: "streetNumber" });
    register({ name: "telephone" });
    register({ name: "email" });
    register({ name: "password" });
    register({ name: "repeatPassword" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <Row style={{ marginTop: 50 }}>
        <Col xs={6} />
        <Col xs={12}>
          <Card title="Register">
            <Form className="register_form">
              <Form.Item>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                        getBase64(event.file.originFileObj as Blob)
                    }
                >
                  <img
                      src={image ? image : noImage}
                      alt="avatar"
                      style={{ width: "100%" }}
                  />
                </Upload>
              </Form.Item>
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
                  errors.infix !== undefined ? "error" : undefined
                }
                help={
                  errors.infix !== undefined ? errors.infix.message : undefined
                }
              >
                <Input
                  placeholder="infix"
                  name="infix"
                  onChange={(ev) => setValue("infix", ev.target.value)}
                  prefix={<UserAddOutlined />}
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
                  errors.country !== undefined ? "error" : undefined
                }
                help={
                  errors.country !== undefined
                    ? errors.country.message
                    : undefined
                }
              >
                <Input
                  placeholder="country"
                  name="country"
                  onChange={(ev) => setValue("country", ev.target.value)}
                  prefix={<IdcardOutlined />}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.street !== undefined ? "error" : undefined
                }
                help={
                  errors.street !== undefined
                    ? errors.coustreettry.message
                    : undefined
                }
              >
                <Input
                  placeholder="street"
                  name="street"
                  onChange={(ev) => setValue("street", ev.target.value)}
                  prefix={<HomeOutlined />}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.streetNumber !== undefined ? "error" : undefined
                }
                help={
                  errors.streetNumber !== undefined
                    ? errors.streetNumber.message
                    : undefined
                }
              >
                <Input
                  placeholder="street number"
                  name="streetNumber"
                  onChange={(ev) => setValue("streetNumber", ev.target.value)}
                  prefix={<NumberOutlined />}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.telephone !== undefined ? "error" : undefined
                }
                help={
                  errors.telephone !== undefined
                    ? errors.telephone.message
                    : undefined
                }
              >
                <Input
                  placeholder="telephone"
                  name="telephone"
                  onChange={(ev) => setValue("telephone", ev.target.value)}
                  prefix={<PhoneOutlined />}
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
                  errors.password !== undefined
                    ? errors.password.message
                    : undefined
                }
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  onChange={(ev) => setValue("password", ev.target.value)}
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.repeatPassword !== undefined ? "error" : undefined
                }
                help={
                  errors.repeatPassword !== undefined
                    ? errors.repeatPassword.message
                    : undefined
                }
              >
                <Input.Password
                  placeholder="repeatPassword"
                  name="repeatPassword"
                  onChange={(ev) => setValue("repeatPassword", ev.target.value)}
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default RegisterPage;
