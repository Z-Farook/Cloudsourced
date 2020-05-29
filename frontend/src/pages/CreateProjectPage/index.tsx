import React, { useState } from "react";
import { Input, Button, Row, Col, message, Upload } from "antd";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Title from "antd/lib/typography/Title";
import {
  ProjectResourceApi,
  AddWithUserUsingPOSTRequest,
} from "cloudsourced-api";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps {}

type Inputs = {
  projectName: string;
  description: string;
};

const CreateProjectPage: React.FC<IProps> = (props) => {
  const { control, handleSubmit, errors } = useForm<Inputs>();
  const [image, setImage] = useState("");

  const getBase64 = (image: Blob) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });

    reader.readAsDataURL(image);
  };

  const postImage = async (image: string): Promise<string> => {
    image = image.split("base64,")[1];
    const url = "https://api.imgur.com/3/image";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.IMGUR_API_KEY!,
      },
      body: JSON.stringify({
        image,
        type: "base64",
      }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data!.data!.link;
    } catch (e) {
      errorMessage();
      return "";
    }
  };

  const handleProject = async (data: Inputs) => {
    const params: AddWithUserUsingPOSTRequest = {
      id: 1,
      project: {
        description: data.description,
        user: {},
        name: data.projectName,
        image: await postImage(image),
      },
    };
    message.loading({ content: "Saving project...", key: "updatableKey" });
    try {
      const response = await new ProjectResourceApi().addWithUserUsingPOST(
        params
      );
      message.success({
        content: "Project is created succesfully!",
        key: "updatableKey",
        duration: 2,
      });
      props.history.push("/projects/" + response.id);
      //  props.history.push(`projects/${response.id}`);
    } catch (error) {
      errorMessage();
    }
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
              <Title>Create a new project</Title>

              <form onSubmit={handleSubmit(handleProject)}>
                <Controller
                  as={Input}
                  name="projectName"
                  control={control}
                  defaultValue=""
                  placeholder="Project name"
                  rules={{ required: true }}
                />
                <ErrorMessage
                  errors={errors}
                  name="projectName"
                  message="A project name is required"
                />

                <Controller
                  as={Input}
                  name="description"
                  placeholder="Description"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                />
                <ErrorMessage
                  errors={errors}
                  name="description"
                  message="A description is required"
                />
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
                  <img src={image} alt="avatar" style={{ width: "100%" }} />
                </Upload>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </form>
              <h1>
                <br />
                Disclaimer:
                <br />
                Currently adds project to user with id: 1. <br />
                If no user exists throws error. <br /> This is fixed if
                authentication is completed!
              </h1>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateProjectPage;
